const puppeteer = require("puppeteer");
require("dotenv").config({ path: ".env" });

(async () => {

  // LEIA O README ANTES DE USAR!

  // ========= CONFIGURAÇÕES ========

  // Título correto do Curso
  const TITULO_DO_CURSO = "🗂️ M4 - Turma 9 - 2021/Set "

  // Título correto da Aula
  const TITULO_DA_AULA = "🏁 Entrega 09 - Capstone Node - Entrega Final"

  // CTRL + A  e  CTRL + C no Navegador com a página do localhost aberta através do LiveServer
  // Deve começar com http:// ...
  const LOCALHOST_URL = "http://127.0.0.1:5500/modulo_4/sprint_7/capstone_6_entrega/index.html"

  
  // ================================
  
  // Preparar a URL do conteúdo, tirando 
  const NOVA_URL = "https://conteudo-kenzie-fullstack.vercel.app/" + LOCALHOST_URL.substring(22)


  // Inicia um navegador
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Acesso ao Canvas
  await page.goto("https://alunos.kenzie.com.br/");
  console.log("\nAbrindo página do Canvas\n");

  // Através do ID do input de usuário do Canvas, sabemos se estamos na página de Login
  const usernameInput = await page.$$("#pseudonym_session_unique_id");

  console.log(usernameInput.length !== 0 ? "\nLogando no Canvas\n" : "\nUsuário já logado, continuando\n");

  await page.screenshot({ path: "./navigation_history/01-beforeLogin.png" });

  if (usernameInput.length !== 0) {

    // Preenchendo formulário de Login
    await page.type(
        "#pseudonym_session_unique_id",
        `${process.env.CANVAS_USER}`
    );
    await page.type(
        "#pseudonym_session_password", 
        `${process.env.CANVAS_PWD}`
    );

    // Submissão do formulário de Login
    await page.click("#pseudonym_session_remember_me")
    await page.click(".Button--login");
    await page.waitForNetworkIdle({ idleTime: 500})
    
    const loginError = await page.$$(".ic-flash-error")
    console.log(loginError)

    if (loginError.length > 0) {
      console.log("\nCredenciais de Login incorretas!\n")
      process.exit(1)
    }

    console.log("\nLogin efetuado com sucesso\n");
  }

  await page.screenshot({ path: "./navigation_history/02-afterLogin.png" });

  // Verificar se o Curso aparece no Dashboard do usuário
  const courseLink = await page.$$(`[title='${TITULO_DO_CURSO}']`);

  if (courseLink.length === 0) {

    // Não foi encontrado, mensagem de erro + exit
    console.log('\nCurso não encontrado, ou você ainda não possui acesso ao mesmo.\n')
    process.exit(1)
  }
  

  console.log("\nCurso encontrado, acessando página do Curso")
  await page.click(`[title='${TITULO_DO_CURSO}']`);
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/03-coursePage.png" });
  console.log("\nAcesso à página do Curso bem sucedido \n")

  // Loga os nomes de todos os títulos das Aulas do Curso escolhido
  const titles = await page.$$eval(".ig-title", el => el.map(x => x.getAttribute("title")));
  console.log(titles)

  // Verificar se a Aula especificada existe
  const contentLink = await page.$$(`[title='${TITULO_DA_AULA}']`);

  if (contentLink.length === 0) {

    // Não foi encontrada, mensagem de erro + exit
    console.log('\nConteúdo não encontrado.\n')
    process.exit(1)
  }

  // Foi encontrada, navega até a página da Aula
  console.log("\nAula encontrada, acessando página da Aula\n")
  await page.click(`[title='${TITULO_DA_AULA}']`)
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/04-contentPage.png" });
  console.log("\nAcesso à página da Aula bem-sucedido \n")

  // Acessar edição da aula
  console.log("\nAcessando pagina de edicao \n")
  await page.click(".edit_assignment_link")
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/05-contentEditPage.png" });
  console.log("\nAcesso à página de edição bem sucedido \n")

  // Acessar Editor HTML
  console.log("\nAcessando Editor de HTML \n")
  await page.click(".rte_switch_views_link")
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/06-contentEditHTMLPage.png" });
  console.log("\nAcesso ao Editor de HTML bem sucedido \n")

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

  console.log("\nEdição finalizada \n")

  // Salvando edicao
  console.log("\nSalvando alterações \n")
  await page.click(".btn-primary");
  await page.waitForNetworkIdle({ idleTime: 500})
  await page.screenshot({ path: "./navigation_history/08-contentSaved.png" });

  console.log("\nProcesso finalizado \n")

  await browser.close();
  process.exit(0)
})();
