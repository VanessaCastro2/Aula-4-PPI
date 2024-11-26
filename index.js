import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();



app.use(session({
    secret: 'M1nh4Chav3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30
    }
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(),'./pages/public')));


const porta = 3006;
const host = 'localhost';

var listaProdutos = [];



function cadastroProdutoView(req, resp) {
    resp.send(`
            <html>
                <head>
                    <title>Cadastro de produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-3">Cadastro de produto</h1>
                        <form method="POST" action="/cadastrarProduto" class="border p-3 row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="descricao" class="form-label">Descricao</label>
                                <input type="text" class="form-control" id="descricao" name="descricao" placeholder="Digite a descricao do produto">
                            </div>
                            <div class="col-md-4">
                                <label for="fabricante" class="form-label">Fabricante</label>
                                <input type="text" class="form-control" id="fabricante" name="fabricante" placeholder="Digite o fabricante">
                            </div>
                            <div class="col-md-4">
                                <label for="quantidade" class="form-label">Quantidade</label>
                                <div class="input-group has-validation">
                                    <input type="number" class="form-control" id="quantidade" name="quantidade" placeholder="Digite a quantidade">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="validade" class="form-label">Validade</label>
                                <input type="date" class="form-control" id="validade" name=validade>
                            </div>
                            <div class="col-md-4">
                                <label for="fabricacao" class="form-label">Fabricação</label>
                                <input type="date" class="form-control" id="fabricacao" name=fabricacao>
                            </div>
                            <div class="col-md-4">
                                <label for="datacompra" class="form-label">Data da compra</label>
                                <input type="date" class="form-control" id="datacompra" name=datacompra>
                            </div>
                            <div class="col-md-4">
                                <label for="codbarras" class="form-label">Código de barras</label>
                                <input type="number" class="form-control" id="codbarras" name="codbarras" placeholder="Digite o código de barras do produto">
                             </div>
                             <div class="col-md-4">
                                <label for="pcusto" class="form-label">Preço de Custo</label>
                                <input type="number" class="form-control" id="pcusto" name="pcusto" placeholder="Digite o preço de custo fabricante">
                             </div>
                             <div class="col-md-4">
                                <label for="pvenda" class="form-label">Preço de Venda</label>
                                <div class="input-group has-validation">
                                    <input type="number" class="form-control" id="pvenda" name="pvenda" placeholder="Digite o preço de venda do produto">
                                </div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                            </div>
                            </form>
                        </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
    `);
}

function menuView(req, resp) {
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if(!dataHoraUltimoLogin){
        dataHoraUltimoLogin = '';
    }
    resp.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Cliente</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                  <nav class="navbar navbar-expand-lg bg-body-tertiary">
                     <div class="container-fluid">
                        <a class="navbar-brand" href="#">Menu</a>
                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Alternar navegação">
                     <span class="navbar-toggler-icon"></span>
                 </button>
                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                 <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/cadastrarProduto">Cadastrar Produto</a>
                 </li>
                 <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                 </li>
                 
                 <li class="nav-item">
                    <a class="nav-link desabled" href=# tabindex="-1" aria-desabled="true">Seu último acesso foi realizado em ${dataHoraUltimoLogin}</a> 
                 </li>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>     
        `);
}

function cadastrarProduto(req, resp) {
    const descricao = req.body.descricao;
    const fabricante = req.body.fabricante;
    const quantidade = req.body.quantidade;
    const validade = req.body.validade;
    const fabricacao = req.body.fabricacao;
    const datacompra = req.body.datacompra;
    const codbarras = req.body.codbarras;
    const pcusto = req.body.pcusto;
    const pvenda = req.body.pvenda;

    
    if (descricao && fabricante && quantidade && validade && fabricacao && datacompra && codbarras && pcusto && pvenda) {

        const produto = { descricao, fabricante, quantidade, validade, fabricacao, datacompra, codbarras, pcusto, pvenda };

        listaProdutos.push(produto);

        resp.write(`
        <html>
            <head>
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Descrição</th>
                            <th scope="col">Fabricante</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Validade</th>
                            <th scope="col">Fabricação</th>
                            <th scope="col">Data da compra</th>
                            <th scope="col">Código de barras</th>
                            <th scope="col">Preço de Custo</th>
                            <th scope="col">Preço de Venda</th>
                        </tr>
                    </thead>
                    <tbody>`);
        for (var i = 0; i < listaProdutos.length; i++) {
            resp.write(`
                            <tr>
                                <td>${listaProdutos[i].descricao}</td>
                                <td>${listaProdutos[i].fabricante}</td>
                                <td>${listaProdutos[i].quantidade}</td>
                                <td>${listaProdutos[i].validade}</td>
                                <td>${listaProdutos[i].fabricacao}</td>
                                <td>${listaProdutos[i].datacompra}</td>
                                <td>${listaProdutos[i].codbarras}</td>
                                <td>${listaProdutos[i].pcusto}</td>
                                <td>${listaProdutos[i].pvenda}</td>
                            </tr>`

            );
        }

        resp.write(`</tbody>
            </table>   
            <a class="btn btn-primary" href="/cadastrarProduto">Continuar Cadastrando</a>  
            <a class="btn btn-secondary" href="/">Voltar ao Menu</a>   
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>`);
    }
    else{
        resp.write(`
            <html>
                <head>
                    <title>Cadastro de produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-3">Cadastro de produto</h1>
                        <form method="POST" action="/cadastrarProduto" class="border p-3 row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="descricao" class="form-label">Descrição</label>
                                <input type="text" class="form-control" id="descricao" name="descricao" placeholder="Digite a descrição do produto" value="${descricao || ''}">
            `);
        if (!descricao) {
            resp.write(`
                                <div>
                                    <span><p class="bg-danger">Por favor, você deve informar a descrição do produto.</p></span>
                                </div>
            `);
        }
        resp.write(`
                            </div>
                            <div class="col-md-4">
                                <label for="fabricante" class="form-label">Fabricante</label>
                                <input type="text" class="form-control" id="fabricante" name="fabricante" placeholder="Digite o fabricante" value="${fabricante || ''}">
            `);
        if (!fabricante) {
            resp.write(`
                                <div>
                                    <span><p class="bg-danger">Por favor, você deve informar o fabricante do produto.</p></span>
                                </div>
            `);
        }
        resp.write(`
                            </div>
                            <div class="col-md-4">
                                <label for="quantidade" class="form-label">Quantidade</label>
                                <div class="input-group has-validation">
                                    <input type="number" class="form-control" id="quantidade" name="quantidade" placeholder="Digite a quantidade" value="${quantidade || ''}">
            `);
        if (!quantidade) {
            resp.write(`
                                    <div>
                                        <span><p class="bg-danger">Por favor, você deve informar a quantidade do produto.</p></span>
                                    </div>
            `);
        }
        resp.write(`
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="validade" class="form-label">Validade</label>
                                <input type="date" class="form-control" id="validade" name="validade" value="${validade || ''}">
            `);
        if (!validade) {
            resp.write(`
                                <div>
                                    <span><p class="bg-danger">Por favor, você deve informar a data de validade do produto.</p></span>
                                </div>
            `);
        }
        resp.write(`
                            </div>
                            <div class="col-md-4">
                                <label for="fabricacao" class="form-label">Fabricação</label>
                                <input type="date" class="form-control" id="fabricacao" name="fabricacao" value="${fabricacao || ''}">
            `);
        if (!fabricacao) {
            resp.write(`
                                <div>
                                    <span><p class="bg-danger">Por favor, você deve informar a data de fabricação do produto.</p></span>
                                </div>
            `);
        }
        resp.write(`
                            </div>
                            <div class="col-md-4">
                                <label for="datacompra" class="form-label">Data da compra</label>
                                <input type="date" class="form-control" id="datacompra" name="datacompra" value="${datacompra || ''}">
            `);
        if (!datacompra) {
            resp.write(`
                                <div>
                                    <span><p class="bg-danger">Por favor, você deve informar a data da compra do produto.</p></span>
                                </div>
            `);
        }
        resp.write(`
                            </div>
                            <div class="col-md-4">
                                <label for="codbarras" class="form-label">Código de barras</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" id="codbarras" name="codbarras" placeholder="Digite o código de barras" value="${codbarras || ''}">
            `);
        if (!codbarras) {
            resp.write(`
                                    <div>
                                        <span><p class="bg-danger">Por favor, você deve informar o código de barras do produto.</p></span>
                                    </div>
            `);
        }
        resp.write(`
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="pcusto" class="form-label">Preço de custo</label>
                                <div class="input-group has-validation">
                                    <input type="number" class="form-control" id="pcusto" name="pcusto" placeholder="Digite o preço de custo" value="${pcusto || ''}">
            `);
        if (!pcusto) {
            resp.write(`
                                    <div>
                                        <span><p class="bg-danger">Por favor, você deve informar o preço de custo do produto.</p></span>
                                    </div>
            `);
        }
        resp.write(`
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="pvenda" class="form-label">Preço de Venda</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" id="pvenda" name="pvenda" placeholder="Digite o preço de venda" value="${pvenda || ''}">
            `);
        if (!pvenda) {
            resp.write(`
                                    <div>
                                        <span><p class="bg-danger">Por favor, você deve informar o preço de venda do produto.</p></span>
                                    </div>
            `);
        }
        resp.write(`
                                </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary">Cadastrar Produto</button>
                            </div>
                        </form>
                    </div>
                </body>
            </html>
        `);        
    }
    
    resp.end();


}

function autenticarUsuario(req, resp){
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === 'admin' && senha === '123'){
        req.session.usuarioLogado = true;
        resp.cookie('dataHoraUltimoLogin', new Date().toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly:true});
        resp.redirect('/');

    }
    else{
        resp.write(`<html>
                        <head>
                            <meta charset="utf-8"
                        <head>
                        <body>
                            <p>Usuário ou senha inválidos</p>
                        <body>
                    </html>`)
    }
}

function verificarAutenticacao(req, resp, next){
    if(req.session.usuarioLogado){
        next();
    }
    else{
        resp.redirect('/login.html');
    }
}
app.post('/login', autenticarUsuario);

app.get('/login', (req, resp) =>{
    resp.redirect('/login.html');
});
app.get('/logout', (req, resp) => {
    req.session.destroy();
    resp.redirect('/login.html')
})
app.get('/', verificarAutenticacao, menuView);
app.get('/cadastrarProduto', verificarAutenticacao, cadastroProdutoView);

app.post('/cadastrarProduto', verificarAutenticacao, cadastrarProduto);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});
