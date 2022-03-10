const puppeteer = require("puppeteer");
require("dotenv").config({ path: ".env" });

(async () => {

  /* FUNCIONAMENTO

  ######################## ENTRADAS #############################
  
  Para o correto funcionamento da inserção do conteúdo no Canvas,
  As entradas devem ser preenchidas corretamente.

  ===================== TITULO_DO_CURSO =========================

  Acessar o Curso no Canvas e copiar o nome que aparece
  no canto superior esquerdo. Segue um exemplo visual abaixo:

  https://i.imgur.com/QiFHenZ.png

  ====================== TITULO_DA_AULA ==========================

  Pode ser copiado direto da página do Curso, exemplo:

  https://i.imgur.com/t7XSQTt.png

  ========================= URL_NOVA =============================

  Assumindo que você quer fazer a migração do conteúdo, você deve
  ter acesso ao repositório em que o mesmo se encontra. Seguindo os
  passos abaixo, podemos gerar a nova URL:

  1 - Abrir o arquivo com o LiveServer

  2 - Copiar a URL (mesmo com o http://seu.ip.local/)

  3 - Abrir este CODE PEN: https://codepen.io/eparragakenzie/pen/PoOgKOp

  4 - Colocar a URL copiada na Input

  5 - Clicar em GERAR URL

  6 - Clicar em COPIAR URL
  
  PRONTO! Você tem em mãos a URL_NOVA! Substitua na variável abaixo

  ======================= EXECUTANDO =============================

  Abra um terminal na pasta deste projeto e digite o comando:

  $ yarn justdoit

  No final do processo, imagens da navegação são guardadas em ordem
  na pasta /navigation_history
  
  */

  const TITULO_DO_CURSO = 'M2 - Modelo' 
  const TITULO_DA_AULA = "Teste Titulo Com Emoji 🏆"
  const NOVA_URL = `https://conteudo-kenzie-fullstack.vercel.app/modulo_2/sprint_3/async_e_await/aula.html
  `

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Acesso ao Canvas Web
  await page.goto("https://alunos.kenzie.com.br/");
  console.log("\nAcesso ao Canvas \n");

  // Verificar se precisa de Login procurando o elemento input
  const usernameInput = await page.$$("#pseudonym_session_unique_id");

  console.log(usernameInput.length !== 0 ? "\nLogando no Canvas\n" : "\nUsuário já logado, continuando\n");

  await page.screenshot({ path: "./navigation_history/01-beforeLogin.png" });

  if (usernameInput.length !== 0) {

    // Fill credentials
    await page.type(
        "#pseudonym_session_unique_id",
        `${process.env.CANVAS_USER}`
    );
    await page.type(
        "#pseudonym_session_password", 
        `${process.env.CANVAS_PWD}`
    );

    // Submit Form
    await page.click(".Button--login");
    // await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.waitForNetworkIdle({ idleTime: 500})
    console.log("\nLogin efetuado com sucesso \n");
  }

  await page.screenshot({ path: "./navigation_history/02-afterLogin.png" });

  // Acessar pagina do Curso
  const courseLink = await page.$$(`[title='${TITULO_DO_CURSO}']`);

  if (courseLink.length === 0) {

    console.log('\nCurso não encontrado, ou você ainda não possui acesso ao mesmo.\n')
    process.exit(1)
  }

  await page.click(`[title='${TITULO_DO_CURSO}']`);
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/03-coursePage.png" });
  console.log("\nAcessando a página do curso \n")

  // Acessar aula especificada

  const contentLink = await page.$$(`[title='${TITULO_DA_AULA}']`);

  if (contentLink.length === 0) {

    console.log('\nConteúdo não encontrado.\n')
    process.exit(1)
  }

  await page.click(`[title='${TITULO_DA_AULA}']`)
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/04-contentPage.png" });
  console.log("\nAcessando pagina do conteudo \n")

  // Acessar edição da aula
  await page.click(".edit_assignment_link")
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/05-contentEditPage.png" });
  console.log("\nAcessando pagina de edicao \n")

  // Acessar Editor HTML
  await page.click(".rte_switch_views_link")
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/06-contentEditHTMLPage.png" });
  console.log("\nAcessando edicao de HTML \n")

  // Capturando HTML Antigo
  let iframeContent = await page.$eval("#assignment_description", el => el.textContent)

  // Focando o TextField que guarda o conteudo
  await page.focus("#assignment_description");

  // Deletando o conteudo antigo
  for (let i = 0; i < iframeContent.length; i++) {
    await page.keyboard.press('Backspace');
  }

  // Preparando conteudo com nova URL
  let newContent = `<p><iframe style="width: 100%; height: 1024px;" src="${NOVA_URL}" width="100%" height="1024px" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></p>`

  // Simulando digitacao da nova URL
  await page.type(
    "#assignment_description",
    `${newContent}`
  );

  await page.screenshot({ path: "./navigation_history/07-migrationEnd.png" });

  console.log("\nEdicao finalizada \n")

  // Salvando edicao
  await page.click(".btn-primary");
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/08-contentSaved.png" });

  console.log("\nSalvando edicoes \n")

  await browser.close();
})();
