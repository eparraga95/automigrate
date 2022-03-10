## INSTALAÇÃO
<hr>

Clone o projeto em sua máquina, acesse a pasta no terminal e instale
as dependências com o comando:

```
$ yarn
```
## LINKS ÚTEIS
<hr>

<ul>
    <li>
        <a href='https://github.com/puppeteer/puppeteer/blob/v13.5.1/docs/api.md#' target='_blank' rel='noreferer'>Puppeteer @ Github</a>
    </li>
    <li>
        <a href='https://github.com/puppeteer/puppeteer/blob/v13.5.1/docs/api.md#' target='_blank' rel='noreferer'>Puppeteer API</a>
    </li>
</ul>

## FUNCIONAMENTO
<hr>

### ENTRADAS 
  
  Para o correto funcionamento da inserção do conteúdo no Canvas,
  As entradas devem ser preenchidas corretamente.

#### TITULO_DO_CURSO

  Acessar o Curso no Canvas e copiar o nome que aparece
  no canto superior esquerdo. Segue um exemplo visual abaixo:

  https://i.imgur.com/QiFHenZ.png

#### TITULO_DA_AULA

  Pode ser copiado direto da página do Curso, exemplo:

  https://i.imgur.com/t7XSQTt.png

#### URL_NOVA

  Assumindo que você quer fazer a migração do conteúdo, você deve
  ter acesso ao repositório em que o mesmo se encontra. Seguindo os
  passos abaixo, podemos gerar a nova URL:

  1 - Abrir o arquivo com o LiveServer

  2 - Copiar a URL (mesmo com o http://seu.ip.local/)

  3 - Abrir este CODE PEN: https://codepen.io/eparragakenzie/pen/PoOgKOp

  4 - Colocar a URL copiada na Input

  5 - Clicar em GERAR URL

  6 - Clicar em COPIAR URL
  
  PRONTO! Você tem em mãos a URL de produção! Substitua na variável URL_NOVA!

### EXECUTANDO 

  Abra um terminal na pasta deste projeto e digite o comando:
```
  $ yarn justdoit
```
  No final do processo, imagens da navegação são guardadas em ordem
  na pasta /navigation_history