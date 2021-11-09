using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using senai.spmedgroup.webApi.Repositories;
using senai.spmedgroup.webApi.ViewModels;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace senai.spmedgroup.webApi.Controllers
{
    [Produces("application/json")]

    //Define que a rota de uma requisição será no formato domino/api/nomeController.
    // ex: http://localhost:5000/api/login
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Login (LoginViewModel login)
        {
            try
            {
                Usuario usuarioBuscado = _usuarioRepository.Login(login.Email, login.Senha);

                if (usuarioBuscado == null)
                {
                    return NotFound("E-mail ou senha inválidos!");
                }

                var minhasClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),
                    new Claim(JwtRegisteredClaimNames.Name, usuarioBuscado.NomeUsuario),
                    new Claim(ClaimTypes.Role, usuarioBuscado.IdTipoUsuario.ToString()),
                    new Claim( "role", usuarioBuscado.IdTipoUsuario.ToString() )
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("FSWUHV654898vferger194SF#BFD14D@RFBHE4634SDV"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var meuToken = new JwtSecurityToken(
                    issuer:             "senai.spmedgroup.webAPI",
                    audience:           "senai.spmedgroup.webAPI",
                    claims:             minhasClaims,
                    expires:            DateTime.Now.AddMinutes(35),
                    signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(meuToken)
                });
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
    }
}
