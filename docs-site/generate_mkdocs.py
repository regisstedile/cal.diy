import os
import yaml

DOCS_DIR = "/home/regis/stack/cal-diy/docs/cal.com"
MKDOCS_FILE = "/home/regis/stack/cal-diy/docs-site/mkdocs.yml"

def categorize_files(files):
    nav = {
        "API Reference (v2)": [],
        "Atoms": [],
        "Desenvolvimento": [],
        "Self-Hosting": [],
        "Outros": []
    }
    
    for f in sorted(files):
        if not f.endswith(".md"):
            continue
            
        path = f"cal.com/{f}"
        if f.startswith("docs-api-reference-v2-"):
            nav["API Reference (v2)"].append(path)
        elif f.startswith("docs-atoms-"):
            nav["Atoms"].append(path)
        elif f.startswith("docs-developing-"):
            nav["Desenvolvimento"].append(path)
        elif f.startswith("docs-self-hosting-"):
            nav["Self-Hosting"].append(path)
        else:
            nav["Outros"].append(path)
            
    # Converter para o formato suportado pelo MkDocs
    nav_list = []
    for category, items in nav.items():
        if items:
            # Simplificar o nome para o menu
            category_items = []
            for item in items:
                # Pegar apenas o nome do arquivo sem extensão e sem o prefixo principal
                basename = os.path.basename(item)
                title = basename.replace(".md", "").replace("-", " ").title()
                if title.startswith("Docs Api Reference V2 "):
                    title = title.replace("Docs Api Reference V2 ", "")
                elif title.startswith("Docs Atoms "):
                    title = title.replace("Docs Atoms ", "")
                elif title.startswith("Docs Developing "):
                    title = title.replace("Docs Developing ", "")
                elif title.startswith("Docs Self Hosting "):
                    title = title.replace("Docs Self Hosting ", "")
                category_items.append({title: item})
            
            nav_list.append({category: category_items})
            
    return nav_list

def main():
    files = os.listdir(DOCS_DIR)
    nav_list = categorize_files(files)
    
    config = {
        "site_name": "Cal.com Documentation (Local)",
        "docs_dir": "../docs",
        "theme": {
            "name": "material",
            "features": [
                "navigation.tabs",
                "navigation.sections"
            ]
        },
        "nav": nav_list
    }
    
    with open(MKDOCS_FILE, "w") as f:
        yaml.dump(config, f, sort_keys=False, allow_unicode=True)
        
    print(f"Generated {MKDOCS_FILE} successfully with {sum(len(list(v.values())[0]) if isinstance(v, dict) else 1 for c in nav_list for v in c.values())} files.")

if __name__ == "__main__":
    main()
