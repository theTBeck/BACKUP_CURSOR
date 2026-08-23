# Dialetos e tags BCP 47

Preferir tag específica quando TheMasterBECK nomear variedade. Genérico só se não houver dialeto.

## Chinês

| Pedido típico | Tag | Notas |
|---|---|---|
| Mandarim / chinês (China continental) | `zh-Hans` | Simplificado |
| Chinês tradicional / Taiwan / HK mandarim | `zh-Hant` | Tradicional |
| Cantonês / Guangdong / HK falado | `yue` | Não confundir com `zh-Hant` |
| "Chinês" sem especificar | `zh-Hans` | Default; confirmar se ambíguo |

## Inglês

| Pedido típico | Tag | Notas |
|---|---|---|
| Inglês britânico / UK | `en-GB` | spelling -ise/-our, vocabulário UK |
| Inglês americano | `en-US` | |
| Inglês escocês / Scottish English | `en-Scotland` | Inglês padrão com léxico/ritmo escocês — **não** Gaélico (`gd`) |
| Inglês sem especificar | `en` | Neutro internacional; evitar mistura UK/US |

## Outras variedades críticas

| Pedido | Tag |
|---|---|
| Espanhol México / LATAM genérico comercial | `es-MX` |
| Espanhol Espanha | `es-ES` |
| Português Brasil | `pt-BR` |
| Português Portugal | `pt-PT` |
| Japonês | `ja` (equiv. `ja-JP`) |
| Coreano | `ko` |
| Filipino / Tagalog comercial | `fil` (vendor ISO pode listar `tl`) |

## Mapeamento vendor (umpirsky)

Pastas usam underscore: `zh_Hans`, `en_GB`, `pt_BR`. Na skill e na regra usar hífen BCP 47: `zh-Hans`, `en-GB`, `pt-BR`.

`yue` aparece no catálogo `data/en/language.json` (nome), mas **não** há pasta `data/yue/`. `en-Scotland` não é locale ISO do vendor — tratar via esta referência + capacidade do modelo (não confundir com Gaélico `gd`).
