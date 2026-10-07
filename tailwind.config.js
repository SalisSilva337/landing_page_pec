// Configuração do Tailwind CLI: onde procurar classes, cores da marca e fontes.
// Depois de mudar classes no HTML/JS ou este arquivo, gere o CSS de novo (ver README, "Tailwind").
module.exports = {
    content: ['./index.html', './js/**/*.js'],
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
