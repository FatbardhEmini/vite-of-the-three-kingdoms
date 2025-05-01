import {
  Tree,
  formatFiles,
  readProjectConfiguration,
  ProjectConfiguration,
  addDependenciesToPackageJson,
  installPackagesTask,
} from '@nx/devkit';

// Define the schema interface based on schema.json
interface Schema {
  project: string;
  type: 'host' | 'remote';
}

// Helper function to find vite.config.ts/js
function findViteConfig(tree: Tree, projectRoot: string): string | null {
  const possibleFiles = [`${projectRoot}/vite.config.ts`, `${projectRoot}/vite.config.js`];
  for (const file of possibleFiles) {
    if (tree.exists(file)) {
      return file;
    }
  }
  return null;
}

// Helper function to update Vite configuration (simplified using string manipulation)
function updateViteConfig(tree: Tree, viteConfigPath: string, options: Schema, projectConfig: ProjectConfiguration) {
  const currentConfigContent = tree.read(viteConfigPath)?.toString('utf-8');
  if (!currentConfigContent) {
    throw new Error(`Could not read vite config: ${viteConfigPath}`);
  }

  let updatedContent = currentConfigContent;

  // Define the federation config object parts
  const sharedConfig = `{
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
    // Add other shared singletons like styled-components here if needed
  }`;

  let federationConfigObject: string;
  const projectName = options.project; // Use the actual project name

  if (options.type === 'host') {
    // Basic host config - assumes remotes will be defined later or manually
    federationConfigObject = `{
      name: '${projectName}-host', // Use project name for host
      remotes: {
        // TODO: Define remotes - this likely needs more sophisticated logic
        // e.g., discover other remotes in the workspace or take them as input
        // Example: auroria: 'auroria@http://localhost:3001/remoteEntry.js',
      },
      shared: ${sharedConfig},
    }`;
  } else { // remote
    // Example component name - adjust as needed for actual component paths
    const safeProjectName = projectName.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize name for var usage
    const componentName = `${safeProjectName.charAt(0).toUpperCase() + safeProjectName.slice(1)}Widget`;
    const componentPath = `./src/app/${componentName}`; // Assumed path - MAKE SURE THIS EXISTS or is created

    federationConfigObject = `{
      name: '${projectName}', // Use project name for remote
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': '${componentPath}', // Expose a generic './Widget' for simplicity
      },
      shared: ${sharedConfig},
    }`;

    // TODO: Add logic here to ensure the exposed component file actually exists
    // e.g., tree.exists(joinPathFragments(projectConfig.root, componentPath + '.tsx'))
    // or even create a placeholder component if it doesn't exist.
     console.warn(`Ensure component at '${componentPath}.tsx' (or .jsx) exists in project ${projectName}`);

  }

  // Create the new import statement for federation
  const federationImport = `import federation from '@originjs/vite-plugin-federation';`;

  // Create the federation plugin call string
  const federationPluginCall = `federation(${federationConfigObject})`;

  // --- String Manipulation Logic ---

  // Add import if not present
  if (!updatedContent.includes('@originjs/vite-plugin-federation')) {
     // Add after other imports, simplistic approach
     const importMatch = updatedContent.match(/import(?:["'\s]*(?:[\w*{}\n\r\t, ]+)from\s*)?['"][\s\S]+?['"];?\s*\n/gm); // More robust regex
     if (importMatch) {
        const lastImport = importMatch[importMatch.length - 1];
        updatedContent = updatedContent.replace(lastImport, `${lastImport}${federationImport}\n`);
     } else {
         // Add at the top if no imports found
         updatedContent = `${federationImport}\n${updatedContent}`;
     }
  }


  // Add federation plugin to plugins array if not already present
  if (!updatedContent.includes('@originjs/vite-plugin-federation')) { // Check if federation call exists
      const pluginsRegex = /plugins:\s*\[([^\]]*)\]/;
      const match = updatedContent.match(pluginsRegex);

      if (match) {
        const existingPlugins = match[1].trim();
        // Check if federation() call is already there (simple check)
        if (!existingPlugins.includes('federation(')) {
            const separator = existingPlugins && !existingPlugins.endsWith(',') ? ',' : ''; // Add comma if needed
            const newPlugins = existingPlugins ? `${existingPlugins}${separator}\n    ${federationPluginCall},` : `\n    ${federationPluginCall},\n  `; // Add trailing comma
            updatedContent = updatedContent.replace(pluginsRegex, `plugins: [${newPlugins}]`);
        }
      } else {
        // If no 'plugins' array, attempt to add it within defineConfig({})
         const defineConfigRegex = /(defineConfig\(\s*{\s*)/;
         const defineMatch = updatedContent.match(defineConfigRegex);
         if(defineMatch){
             updatedContent = updatedContent.replace(defineConfigRegex, `$1plugins: [${federationPluginCall},],\n`); // Add plugins array
         } else {
            console.warn(`Could not automatically find or add 'plugins' array to ${viteConfigPath}. Manual configuration required.`);
         }
      }
  }


  // --- String Manipulation End ---

  // Write the potentially modified content back to the file
  tree.write(viteConfigPath, updatedContent);
  console.log(`Updated ${viteConfigPath} with Module Federation config (type: ${options.type}).`);
}

export default async function setupViteMfGenerator(tree: Tree, options: Schema) {
  const projectConfig = readProjectConfiguration(tree, options.project);
  if (!projectConfig) {
    throw new Error(`Project "${options.project}" not found!`);
  }

  console.log(`Configuring project: ${options.project} as type: ${options.type}`);
  console.log('Project Root:', projectConfig.root);

  // 1. Find vite.config.ts or vite.config.js
  const viteConfigPath = findViteConfig(tree, projectConfig.root);
  if (!viteConfigPath) {
    throw new Error(
      `Could not find vite.config.ts or vite.config.js for project "${options.project}". Is it a Vite project?`
    );
  }
  console.log('Found Vite config:', viteConfigPath);

  // 2. Add vite-plugin-module-federation dependency
  const installDependenciesTask = addDependenciesToPackageJson(
    tree,
    {},
    // Ensure vite-plugin-module-federation is compatible with your Vite version
    { 'vite-plugin-module-federation': 'latest' } // Use latest or pin a specific version
  );

  // 3. Update vite.config.ts
  updateViteConfig(tree, viteConfigPath, options, projectConfig);

  await formatFiles(tree);

  // Return a function that executes the package installation task
  return () => {
    installPackagesTask(tree); // Executes the task scheduled by addDependenciesToPackageJson
  };
} 