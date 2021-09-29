using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using senai.spmedgroup.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedgroup.webApi.Controllers
{
    [Produces("application/json")]

    //Define que a rota de uma requisição será no formato domino/api/nomeController.
    // ex: http://localhost:5000/api/medicos
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "1")]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository { get; set; }

        public MedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_medicoRepository.ListarTodos());
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }

        [HttpGet("idMedico")]
        public IActionResult BuscarPorId(int idMedico)
        {
            try
            {
                return Ok(_medicoRepository.BuscarPorId(idMedico));
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(Medico novoMedico)
        {
            try
            {
                _medicoRepository.Cadastrar(novoMedico);

                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }

        [HttpPut]
        public IActionResult Atualizar(Medico medicoAtualizado)
        {
            try
            {
                _medicoRepository.Atualizar(medicoAtualizado);

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }

        [HttpDelete("idUsuario")]
        public IActionResult Deletar(int idUsuario)
        {
            try
            {
                if (_medicoRepository.BuscarPorId(idUsuario) == null)
                {
                    return BadRequest(new
                    {
                        mensagem = "Não foi encontrada nenhum médico com o id informado."
                    });
                }

                if (idUsuario <= 0)
                {
                    return BadRequest(new
                    {
                        mensagem = "Por favor, insira um id válido."
                    });
                }

                _medicoRepository.Deletar(idUsuario);

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }
    }
}
