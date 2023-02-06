import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import './filme-info.css'

function Filme() {
  const { id } = useParams()
  const navigation = useNavigate()

  const [filme, setFilme] = useState({})
  const [load, setLoad] = useState(true)

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "75b26930de69d408b44371a1282891ea",
          language: "pt-BR",
        }
      })
        .then((response) => {
          setFilme(response.data);
          setLoad(false)
        })
        .catch(() => {
          console.log('Filme não encontrado')
          navigation('/', { replace: true })
          return
        })
    }

    loadFilme()
  }, [navigation, id])

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeFlix")

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if (hasFilme) {
      toast.warn('Esse filme ja está na sua lista')
      return
    }

    filmesSalvos.push(filme)
    localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso')
  }

  if (load) {
    return (
      <div className="filme-info">
        <h1>Carregando Detalhes...</h1>
      </div>
    )
  }
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <stron> Avaliação: {filme.vote_average} / 10</stron>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank"
            rel='external'
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >Trailer</a>
        </button>
      </div>
    </div>
  )
}

export default Filme