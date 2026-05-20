import os
import json
import re

OPENAPI_PATH = "/home/regis/stack/cal-diy/docs/api-reference/v2/openapi.json"
DOCS_DIR = "/home/regis/stack/cal-diy/docs/cal.com"
REPORT_PATH = "/home/regis/stack/cal-diy/docs-site/api_discrepancy_report.md"

def extract_openapi_endpoints():
    with open(OPENAPI_PATH) as f:
        data = json.load(f)
    
    endpoints = []
    for path, methods in data.get("paths", {}).items():
        for method, details in methods.items():
            summary = details.get("summary", "")
            operation_id = details.get("operationId", "")
            endpoints.append({
                "method": method.upper(),
                "path": path,
                "summary": summary,
                "operation_id": operation_id
            })
    return endpoints

def extract_markdown_docs():
    docs = []
    for f in os.listdir(DOCS_DIR):
        if not f.startswith("docs-api-reference-v2-") or not f.endswith(".md"):
            continue
        filepath = os.path.join(DOCS_DIR, f)
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read(500) # Ler o começo para pegar o frontmatter
            title_match = re.search(r'title:\s*"([^"]+)"', content)
            title = title_match.group(1) if title_match else ""
            docs.append({
                "filename": f,
                "title": title
            })
    return docs

def compare_and_report(endpoints, docs):
    doc_titles = {d["title"].lower().strip(): d for d in docs if d["title"]}
    
    missing_docs = []
    documented_endpoints = []
    
    for ep in endpoints:
        summary_clean = ep["summary"].lower().strip()
        if summary_clean in doc_titles:
            documented_endpoints.append(ep)
        else:
            missing_docs.append(ep)
            
    # Markdown documentation that couldn't be matched (maybe outdated)
    endpoint_summaries = {ep["summary"].lower().strip() for ep in endpoints if ep["summary"]}
    orphaned_docs = [d for d in docs if d["title"].lower().strip() not in endpoint_summaries]

    with open(REPORT_PATH, "w") as f:
        f.write("# Relatório de Discrepância da API (OpenAPI vs Markdown)\n\n")
        
        f.write(f"**Total de Endpoints no código (OpenAPI):** {len(endpoints)}\n")
        f.write(f"**Total de Arquivos Markdown da API:** {len(docs)}\n\n")
        
        f.write("## ❌ Endpoints sem documentação clara (Faltando)\n")
        f.write("Estes endpoints existem no código, mas o `summary` não bateu com nenhum `title` dos arquivos Markdown.\n\n")
        if missing_docs:
            for ep in missing_docs:
                f.write(f"- **{ep['method']} {ep['path']}** -> Summary: `{ep['summary']}`\n")
        else:
            f.write("Todos os endpoints estão documentados! 🎉\n")
            
        f.write("\n## ⚠️ Documentações Órfãs (Desatualizadas ou sem correspondência)\n")
        f.write("Estes arquivos Markdown têm um título que não existe no `openapi.json`.\n\n")
        if orphaned_docs:
            for doc in orphaned_docs:
                f.write(f"- `{doc['filename']}` -> Title: `{doc['title']}`\n")
        else:
            f.write("Nenhuma documentação órfã encontrada. 🎉\n")
            
    print(f"Report generated at {REPORT_PATH}")

def main():
    endpoints = extract_openapi_endpoints()
    docs = extract_markdown_docs()
    compare_and_report(endpoints, docs)

if __name__ == "__main__":
    main()
