#!/usr/bin/env python3
"""
comparar-movimento.py — "a refatoração só MOVEU código, ou mudou alguma coisa?"

Uso:
  py -3 comparar-movimento.py            # árvore de trabalho + stage + arquivos novos, contra HEAD
  py -3 comparar-movimento.py main..docs/x
  py -3 comparar-movimento.py <sha>

Lógica: pega o diff (-U0, com detecção de renomeação), normaliza cada linha (trim + espaços
colapsados), descarta linhas vazias, arquivos .md e linhas de "fiação" (link/script/style tags,
comentários). Depois cruza: toda linha removida deveria reaparecer entre as adicionadas, e
vice-versa. O que sobrar é conteúdo apagado ou conteúdo novo.

Saída: humana + código de saída 0 (só moveu) / 1 (há diferenças) / 2 (erro).
"""
import re
import subprocess
import sys
from collections import Counter

# Console do Windows costuma vir em cp1252; sem isto os acentos da saída quebram.
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except AttributeError:
        pass

IGNORAR_EXT = (".md", ".json", ".gitignore")
IGNORAR_PREFIXOS = (".claude/", ".github/")   # ferramental da IA, não é a página
PADROES_FIACAO = [
    r'^<link\s+rel="stylesheet"',      # <link rel="stylesheet" href="css/...">
    r'^<script\s+src=',                 # <script src="js/..." defer></script>
    r'^</?script>$',                    # abertura/fechamento de script inline
    r'^</?style>$',                     # abertura/fechamento de style
    r'^<!--.*-->$',                     # comentário HTML de uma linha
    r'^/\*.*\*/$',                      # comentário CSS/JS de uma linha
    r'^//',                             # comentário JS de linha
    r'^\*',                             # continuação de comentário em bloco
    r'^/\*',                            # abertura de comentário em bloco
    r'^\*/$',                           # fechamento de comentário em bloco
]
FIACAO = [re.compile(p) for p in PADROES_FIACAO]


def git(*args: str) -> str:
    r = subprocess.run(["git", *args], capture_output=True, text=True, encoding="utf-8", errors="replace")
    if r.returncode != 0:
        sys.stderr.write(r.stderr)
        sys.exit(2)
    return r.stdout


def normalizar(linha: str) -> str:
    return re.sub(r"\s+", " ", linha).strip()


def eh_fiacao(linha: str) -> bool:
    return any(p.match(linha) for p in FIACAO)


def coletar(diff: str):
    removidas, adicionadas = Counter(), Counter()
    onde_rem, onde_add = {}, {}
    arquivo = None
    ignorar_arquivo = False
    fiacao = 0
    for raw in diff.splitlines():
        if raw.startswith("+++ ") or raw.startswith("--- "):
            if raw.startswith("+++ "):
                arquivo = raw[4:].strip()
                arquivo = arquivo[2:] if arquivo.startswith("b/") else arquivo
                ignorar_arquivo = arquivo.endswith(IGNORAR_EXT) or arquivo.startswith(IGNORAR_PREFIXOS) or arquivo == "/dev/null"
            continue
        if raw.startswith("@@") or raw.startswith("diff ") or raw.startswith("index ") \
           or raw.startswith("similarity") or raw.startswith("rename ") or raw.startswith("new file") \
           or raw.startswith("deleted file"):
            continue
        if ignorar_arquivo or not raw or raw[0] not in "+-":
            continue
        linha = normalizar(raw[1:])
        if not linha:
            continue
        if eh_fiacao(linha):
            fiacao += 1
            continue
        if raw[0] == "-":
            removidas[linha] += 1
            onde_rem.setdefault(linha, arquivo)
        else:
            adicionadas[linha] += 1
            onde_add.setdefault(linha, arquivo)
    return removidas, adicionadas, onde_rem, onde_add, fiacao


def main() -> int:
    alvo = sys.argv[1] if len(sys.argv) > 1 else "HEAD"
    diff = git("diff", "-U0", "-M", "--no-color", alvo, "--")

    # Com alvo = HEAD, arquivos novos ainda não rastreados contam como "adicionados".
    if alvo == "HEAD":
        for novo in git("ls-files", "--others", "--exclude-standard").splitlines():
            if not novo or novo.endswith(IGNORAR_EXT) or novo.startswith(IGNORAR_PREFIXOS):
                continue
            try:
                with open(novo, encoding="utf-8", errors="replace") as f:
                    corpo = "".join("+" + l for l in f.readlines())
            except OSError:
                continue
            diff += f"\ndiff --git a/{novo} b/{novo}\n--- /dev/null\n+++ b/{novo}\n{corpo}\n"

    rem, add, onde_rem, onde_add, fiacao = coletar(diff)

    apagadas = {l: n - add.get(l, 0) for l, n in rem.items() if n > add.get(l, 0)}
    novas = {l: n - rem.get(l, 0) for l, n in add.items() if n > rem.get(l, 0)}

    print(f"Alvo: {alvo}")
    print(f"Linhas removidas: {sum(rem.values())} | adicionadas: {sum(add.values())} | fiação ignorada: {fiacao}")
    print()

    if not apagadas and not novas:
        print("RESULTADO: só moveu código. Nenhuma linha de conteúdo foi apagada nem criada.")
        return 0

    if apagadas:
        print(f"REMOVIDAS SEM DESTINO ({len(apagadas)}) — conteúdo que sumiu:")
        for l, n in sorted(apagadas.items(), key=lambda x: onde_rem.get(x[0], "")):
            print(f"  [{onde_rem.get(l, '?')}] {'x%d ' % n if n > 1 else ''}{l[:140]}")
        print()
    if novas:
        print(f"ADICIONADAS SEM ORIGEM ({len(novas)}) — conteúdo novo:")
        for l, n in sorted(novas.items(), key=lambda x: onde_add.get(x[0], "")):
            print(f"  [{onde_add.get(l, '?')}] {'x%d ' % n if n > 1 else ''}{l[:140]}")
        print()
    print("RESULTADO: há diferenças de conteúdo. Julgue cada linha: cabeçalho de arquivo novo é ok; texto/cor/preço/seletor diferente não.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
