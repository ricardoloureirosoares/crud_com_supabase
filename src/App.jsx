import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [filtroCurso, setFiltroCurso] = useState('');

  const listarAlunos = useCallback(async (filtro = filtroCurso) => {
    let query = supabase
      .from('alunos')
      .select('*')
      .order('nome', { ascending: true });

    if (filtro.trim() !== '') {
      query = query.ilike('curso', `%${filtro.trim()}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error.message);
      return;
    }
    setAlunos(data);
  }, [filtroCurso]);

  function editarAluno(aluno) {
    setEditandoId(aluno.id);
    setNome(aluno.nome ?? '');
    setEmail(aluno.email ?? '');
    setCurso(aluno.curso ?? '');
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setNome('');
    setEmail('');
    setCurso('');
  }

  async function salvarAluno(event) {
    event.preventDefault();

    if (nome.trim() === '') {
      alert('O nome é obrigatório.');
      return;
    }

    if (editandoId === null) {
      const { error } = await supabase
        .from('alunos')
        .insert([{ nome, email, curso }]);

      if (error) {
        console.error(error.message);
        return;
      }
    } else {
      const { error } = await supabase
        .from('alunos')
        .update({ nome, email, curso })
        .eq('id', editandoId);

      if (error) {
        console.error(error.message);
        return;
      }
    }

    cancelarEdicao();
    listarAlunos();
  }

  async function excluirAluno(id) {
    const { error } = await supabase
      .from('alunos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error.message);
      return;
    }
    listarAlunos();
  }

  useEffect(() => {
    Promise.resolve().then(() => listarAlunos(''));
  }, [listarAlunos]);

  return (
    <div className="appShell">
      <header className="appHeader">
        <h1 className="appTitle">Cadastro de Alunos</h1>
        <p className="appSubtitle">CRUD com Supabase</p>
      </header>

      <section className="card">
        <div className="cardHeader">
          <h2 className="cardTitle">Busca</h2>
        </div>

        <div className="searchRow">
          <input
            className="input"
            type="text"
            placeholder="Buscar por curso (ex.: Informática)"
            value={filtroCurso}
            onChange={(e) => setFiltroCurso(e.target.value)}
          />
          <button className="btn btnPrimary" type="button" onClick={() => listarAlunos()}>
            Buscar
          </button>
          <button
            className="btn btnGhost"
            type="button"
            onClick={() => {
              setFiltroCurso('');
              listarAlunos('');
            }}
          >
            Limpar
          </button>
        </div>
      </section>

      <section className="card">
        <div className="cardHeader">
          <h2 className="cardTitle">{editandoId === null ? 'Novo aluno' : 'Editar aluno'}</h2>
          {editandoId !== null && <span className="badge">Editando #{editandoId}</span>}
        </div>

        <form className="formGrid" onSubmit={salvarAluno}>
          <label className="field">
            <span className="label">Nome</span>
            <input className="input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>

          <label className="field">
            <span className="label">E-mail</span>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="field">
            <span className="label">Curso</span>
            <input className="input" type="text" value={curso} onChange={(e) => setCurso(e.target.value)} />
          </label>

          <div className="formActions">
            <button className="btn btnPrimary" type="submit">
              {editandoId === null ? 'Cadastrar' : 'Salvar alterações'}
            </button>
            {editandoId !== null && (
              <button className="btn btnGhost" type="button" onClick={cancelarEdicao}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <div className="cardHeader">
          <h2 className="cardTitle">Alunos cadastrados</h2>
          <span className="badge">{alunos.length}</span>
        </div>

        {alunos.length === 0 ? (
          <p className="emptyState">Nenhum aluno encontrado.</p>
        ) : (
          <ul className="list">
            {alunos.map((aluno) => (
              <li className="listItem" key={aluno.id}>
                <div className="listMain">
                  <div className="listTitle">{aluno.nome ?? '-'}</div>
                  <div className="listMeta">
                    {(aluno.email ?? '-').trim() || '-'} • {(aluno.curso ?? '-').trim() || '-'}
                  </div>
                </div>

                <div className="listActions">
                  <button className="btn btnSmall" type="button" onClick={() => editarAluno(aluno)}>
                    Editar
                  </button>
                  <button className="btn btnSmall btnDanger" type="button" onClick={() => excluirAluno(aluno.id)}>
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
