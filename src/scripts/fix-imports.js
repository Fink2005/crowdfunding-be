import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { extname, join } from "path";

function addJsExtension(dir) {
  const files = readdirSync(dir);

  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      addJsExtension(fullPath);
    } else if (extname(file) === ".js") {
      let content = readFileSync(fullPath, "utf8");

      // Add .js to relative imports that don't have an extension
      content = content.replace(/from\s+['"](\.[^'"]+)['"]/g, (match, path) => {
        if (!path.match(/\.(js|json)$/)) {
          return `from '${path}.js'`;
        }
        return match;
      });

      // Add .js to dynamic imports
      content = content.replace(/import\s*\(\s*['"](\.[^'"]+)['"]\s*\)/g, (match, path) => {
        if (!path.match(/\.(js|json)$/)) {
          return `import('${path}.js')`;
        }
        return match;
      });

      writeFileSync(fullPath, content, "utf8");
    }
  }
}

addJsExtension("./dist");
console.log("✅ Fixed all imports to include .js extension");
