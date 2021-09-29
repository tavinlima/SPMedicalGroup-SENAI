using Microsoft.AspNetCore.Authorization;
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
    [Produces ("application/json")]

    //Define que a rota de uma requisição será no formato domino/api/nomeController.
    // ex: http://localhost:5000/api/usuarios
    [Route("api/[controller]")]
    [ApiController]
    [Authorize (Roles = "1")]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public UsuariosController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_usuarioRepository.ListarTodos());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpGet("{idUsuario}")]
        public IActionResult BuscarPorId(int idUsuario)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarPorId(idUsuario));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(Usuario novoUsuario)
        {
            try
            {
                _usuarioRepository.Cadastrar(novoUsuario);

                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPut]
        public IActionResult Atualizar(Usuario usuarioAtualizado)
        {
            try
            {
                if (_usuarioRepository.BuscarPorId(usuarioAtualizado.IdUsuario) == null)
                {
                    return BadRequest(new
                    {
                        mensagem = "Não foi encontrado nenhum usuario com o id informado."
                    });
                }

                _usuarioRepository.Atualizar(usuarioAtualizado);

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpDelete("deletar{idUsuario}")]
        public IActionResult Deletar(int idUsuario)
        {
            try
            {
                if (_usuarioRepository.BuscarPorId(idUsuario) == null)
                {
                    return BadRequest(new
                    {
                        mensagem = "Não foi encontrado nenhum usuario com o id informado."
                    });
                }


                if (idUsuario <= 0)
                {
                    return BadRequest(new
                    {
                        mensagem = "Por favor, insira um id válido."
                    });
                }
                _usuarioRepository.Deletar(idUsuario);

                return Ok(new
                {
                    mensagem = "Usuario deletado com sucesso."
                });
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPost("foto/perfil")]
        public IActionResult PostDir(IFormFile arquivo)
        {
            try
            {
                if (arquivo.Length > 50000)
                {
                    return BadRequest(new { mensagem = "O tamanho máximo de 5MB de imagem foi atingido." });
                }

                string extensao = arquivo.FileName.Split('.').Last();

                if (extensao != "png")
                {
                    return BadRequest(new { mensagem = "Apenas arquivos .png são permitidos." });
                }

                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                _usuarioRepository.SalvarPerfilDir(arquivo, idUsuario);

                return Ok();
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }

        [HttpGet("foto/perfil")]
        public IActionResult GetDir()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                string base64 = _usuarioRepository.ConsultarPerfilDir(idUsuario);

                return Ok(base64);
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }
    }
}
