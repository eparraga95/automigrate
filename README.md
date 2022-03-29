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

   Pode ser copiado direto da página do Curso, clicando em EDITAR
  exemplo:

  https://i.imgur.com/pTpx1gD.png

#### LOCALHOST_URL

  - Abra a página do contéudo com o LiveServer

  - Copie a URL do localhost (completa)

  - Cole no valor da variável

### EXECUTANDO 

  Abra um terminal na pasta deste projeto e digite o comando:
```
  $ yarn justdoit
```
  No final do processo, imagens da navegação são guardadas em ordem
  na pasta /navigation_history