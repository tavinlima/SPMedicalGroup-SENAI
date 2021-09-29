using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using senai.spmedgroup.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedgroup.webApi.Controllers
{
    [Produces("application/json")]

    //Define que a rota de uma requisição será no formato domino/api/nomeController.
    // ex: http://localhost:5000/api/pacientes
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "1, 2, 3")]
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository _pacienteRepository { get; set; }

        public PacientesController()
        {
            _pacienteRepository = new PacienteRepository();
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_pacienteRepository.ListarTodos());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpGet("idPaciente")]
        public IActionResult BuscarPorId(int idPaciente)
        {
            try
            {
                return Ok(_pacienteRepository.BuscarPorId(idPaciente));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(Paciente novoPaciente)
        {
            try
            {
                _pacienteRepository.Cadastrar(novoPaciente);

                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPut]
        public IActionResult Atualizar(Paciente pacienteAtualizado)
        {
            try
            {
                _pacienteRepository.Atualizar(pacienteAtualizado);

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpDelete("deletar/idUsuario")]
        public IActionResult Deletar(int idUsuario)
        {
            try
            {
                if (_pacienteRepository.BuscarPorId(idUsuario) == null)
                {
                    return BadRequest(new
                    {
                        mensagem = "Não foi encontrada nenhum paciente com o id informado."
                    });
                }

                if (idUsuario <= 0)
                {
                    return BadRequest(new
                    {
                        mensagem = "Por favor, insira um id válido."
                    });
                }

                _pacienteRepository.Deletar(idUsuario);

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
    }
}
