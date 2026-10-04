// Cores da marca e fontes. Precisa carregar logo depois do CDN do Tailwind, sem defer.
tailwind.config = {
    theme: {
        extend: {
            colors: {
                leather:      '#2B1B12', // couro escuro (fundo principal)
                leatherDeep:  '#1F130C', // couro quase preto
                leatherCard:  '#3A2618', // couro envelhecido (cards)
                caramel:      '#A86A32', // caramelo escuro
                terracotta:   '#9C4F32', // terracota sóbria
                bronze:       '#C08F45', // bronze / dourado queimado
                bronzeLight:  '#DDB572',
                sand:         '#DCC9A6', // areia
                marble:       '#EFEBE4'  // mármore
            },
            fontFamily: {
                serif: ['Cinzel', 'serif'],
                sans: ['Montserrat', 'sans-serif']
            }
        }
    }
}
