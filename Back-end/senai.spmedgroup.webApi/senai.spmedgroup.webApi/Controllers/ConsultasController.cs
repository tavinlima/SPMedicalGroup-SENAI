using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using senai.spmedgroup.webApi.Repositories;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace senai.spmedgroup.webApi.Controllers
{
    [Produces("application/json")]

    //Define que a rota de uma requisição será no formato domino/api/nomeController.
    // ex: http://localhost:5000/api/usuarios
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository _consultaRepository { get; set; }

        public ConsultasController()
        {
            _consultaRepository = new ConsultaRepository();
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            try
            {
                return Ok(_consultaRepository.ListarTodas());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpGet("Paciente")]
        public IActionResult ListarMinhasPaciente()
        {
            try
            {
                int idPaciente = Convert.ToInt32(HttpContext.User.Claims.First(u => u.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_consultaRepository.ListarMinhasPaciente(idPaciente));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpGet("Medico")]
        public IActionResult ListarMinhasMedico()
        {
            try
            {
                int idMedico = Convert.ToInt32(HttpContext.User.Claims.First(u => u.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_consultaRepository.ListarMinhasPaciente(idMedico));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(Consultum novaConsulta)
        {
            try
            {
                _consultaRepository.Cadastrar(novaConsulta);

                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPatch("situacao/{idConsulta}")]
        public IActionResult MudarSituacao(int idConsulta, Situacao situacao)
        {
            try
            {
                _consultaRepository.MudarSituacao(idConsulta, situacao.IdSituacao.ToString());

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPatch("descricao/{idConsulta}")]
        public IActionResult AddDescricao(int idConsulta, Consultum consulta)
        {
            try
            {
                _consultaRepository.AddDescricao(idConsulta, consulta.Descricao);

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPut]
        public IActionResult Atualizar(Consultum consultaAtualizada)
        {
            try
            {
                _consultaRepository.Atualizar(consultaAtualizada);

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpDelete("{idConsulta}")]
        public IActionResult Deletar(int idConsulta)
        {
            try
            {
                _consultaRepository.Deletar(idConsulta);

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
    }
}
