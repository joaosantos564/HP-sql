const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hogwarts',
  password: 'ds564',
  port: 5432,
});

// Middleware para processar JSON
app.use(express.json());

app.get('/bruxos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bruxos');
  
        if (result.rowCount == 0) {
            res.json({
                status: 'success',
                message: 'Não há bruxos cadastrados',
            });
        } else {
          res.json({
            status: 'success',
            message: 'bruxos encontrados',
            total: result.rowCount,
            dados: result.rows,
        })
        }
  
        
    } catch (error) {
        console.error('Erro ao buscar bruxos', error);
        res.status(500).send('Erro ao buscar bruxos');
    }
  
  });

app.post('/bruxos', async (req, res) => {
    const {  nome, idade, casa, habilidade_especial, sangue, patrono } = req.body;
    const query = 'INSERT INTO bruxos (  nome, idade, casa, habilidade_especial, sangue, patrono ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, idade, casa, habilidade_especial, sangue, patrono];
  try {
        const result = await pool.query('INSERT INTO bruxos (  nome, idade, casa, habilidade_especial, sangue, patrono ) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa, habilidade_especial, sangue, patrono]);
        res.status(201).json({
            status: 'success',
            message: 'Bruxo inserido com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao inserir bruxo', error);
        res.status(500).send('Erro ao inserir bruxo');
    }
  });

  app.put('/bruxos/:id', async (req, res) => {
    const id = req.params.id;
    const {  nome, idade, casa, habilidade_especial, sangue, patrono } = req.body;
    const query = 'UPDATE bruxos SET nome=$1, idade=$2, casa=$3, habilidade_especial=$4, sangue=$5, patrono=$6 WHERE id=$7';
    const values = [nome, idade, casa, habilidade_especial, sangue, patrono, id];
  
    try {
        const result = await pool.query('UPDATE bruxos SET nome=$1, idade=$2, casa=$3, habilidade_especial=$4, sangue=$5, patrono=$6 WHERE id=$7', [nome, idade, casa, habilidade_especial, sangue, patrono, id]);
        res.status(201).json({
            status: 'success',
            message: 'Bruxo inserido com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao inserir bruxo', error);
        res.status(500).send('Erro ao inserir bruxo');
    }
  });

  app.delete('/bruxos/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM bruxos WHERE id=$1';
  
    try {
        const result = await pool.query('DELETE FROM bruxos WHERE id=$1', [id]);
        res.json({
            status: 'success',
            message: 'Bruxo deletado com sucesso',
        });
    } catch (error) {
        console.error('Erro ao deletar Bruxo', error);
        res.status(500).send('Erro ao deletar Bruxo');
    }
  });

  app.get('/bruxos/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
        const result = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
  
        if (result.rowCount == 0) {
            return res.status(404).send('Bruxos não encontrado');
        }
        res.json({
            status: 'success',
            message: 'Bruxo retornado com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao buscar bruxo', error);
        res.status(500).send('Erro ao buscar bruxo');
    }
  });

  app.get('/bruxos/nome/:nome', async (req, res) => {
    const { nome } = req.params
  
    try {
        const result = await pool.query('SELECT * FROM bruxos WHERE nome = $1', [nome]);
  
        if (result.rowCount == 0) {
            return res.status(404).send('Bruxos não encontrado');
        }
        res.json({
            status: 'success',
            message: 'Bruxo retornado com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao buscar bruxo', error);
        res.status(500).send('Erro ao buscar bruxo');
    }
  });


//varinhas

app.get('/varinhas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM varinhas');
  
        if (result.rowCount == 0) {
            res.json({
                status: 'success',
                message: 'Não há varinhas cadastrados',
            });
        } else {
          res.json({
            status: 'success',
            message: 'varinhas encontrados',
            total: result.rowCount,
            dados: result.rows,
        })
        }
  
        
    } catch (error) {
        console.error('Erro ao buscar varinhas', error);
        res.status(500).send('Erro ao buscar varinhas');
    }
  
  });

  app.get('/varinhas/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
        const result = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
  
        if (result.rowCount == 0) {
            return res.status(404).send('varinha não encontrada');
        }
        res.json({
            status: 'success',
            message: 'varinha retornada com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao buscar varinha', error);
        res.status(500).send('Erro ao buscar varihha');
    }
  });


  app.post('/varinhas', async (req, res) => {
    const { material, comprimento, nucleo, data_fabricacao } = req.body;
    const query = 'INSERT INTO varinhas ( material, comprimento, nucleo, data_fabricacao ) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [material, comprimento, nucleo, data_fabricacao];
  try {
    const result = await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_fabricacao]);
        res.status(201).json({
            status: 'success',
            message: 'Varinha inserida com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao inserir varinha', error);
        res.status(500).send('Erro ao inserir varinha');
    }
  });

  app.put('/varinhas/:id', async (req, res) => {
    const id = req.params.id;
    const { material, comprimento, nucleo, data_fabricacao } = req.body;
    const query = 'UPDATE varinhas SET material=$1, comprimento=$2, nucleo=$3, data_fabricacao=$4 WHERE id=$5';
    const values = [material, comprimento, nucleo, data_fabricacao, id];
  
    try {
        const result = await pool.query('UPDATE varinhas SET material=$1, comprimento=$2, nucleo=$3, data_fabricacao=$4 WHERE id=$5', [material, comprimento, nucleo, data_fabricacao, id]);
        res.status(201).json({
            status: 'success',
            message: 'varinha inserida com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao inserir varinha', error);
        res.status(500).send('Erro ao inserir varinha');
    }
  });

  app.delete('/varinhas/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM varinhas WHERE id=$1';
  
    try {
        const result = await pool.query('DELETE FROM varinhas WHERE id=$1', [id]);
        res.status(201).json({
            status: 'success',
            message: 'varinha deletada com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao deleta varinha', error);
        res.status(500).send('Erro ao deletar varinha');
    }
  });
  

  

// Iniciando o servidor http://localhost:5000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}🧙🪄✨`);
  });

app.get('/', (req, res) => {
    res.send('a rota esta funcionando')
})