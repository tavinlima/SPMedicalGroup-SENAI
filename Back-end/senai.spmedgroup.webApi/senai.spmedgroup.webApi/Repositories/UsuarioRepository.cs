using Microsoft.AspNetCore.Http;
using senai.spmedgroup.webApi.Context;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace senai.spmedgroup.webApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        readonly SpMedGroupContext ctx = new();
        public void Atualizar(Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = ctx.Usuarios.Find(usuarioAtualizado.IdUsuario);

            usuarioBuscado.Email = usuarioAtualizado.Email;
            usuarioBuscado.Senha = usuarioAtualizado.Senha;
            usuarioBuscado.NomeUsuario = usuarioAtualizado.NomeUsuario;

            ctx.Usuarios.Update(usuarioBuscado);

            ctx.SaveChanges();
        }

        public Usuario BuscarPorId(int idUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }

        public string ConsultarPerfilDir(int idUsuario)
        {
            string nomeArquivo = idUsuario.ToString() + ".png";

            string caminho = Path.Combine("perfil", nomeArquivo);

            if (File.Exists(caminho))
            {
                byte[] byteArquivo = File.ReadAllBytes(caminho);

                return Convert.ToBase64String(byteArquivo);
            }

            return null;
        }

        public void Deletar(int idUsuario)
        {
            ctx.Usuarios.Remove(BuscarPorId(idUsuario));

            ctx.SaveChanges();
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.ToList();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }

        public void SalvarPerfilDir(IFormFile foto, int idUsuario)
        {
            string nomeArquivo = idUsuario.ToString() + ".png";

            using(var stream = new FileStream(Path.Combine("perfil", nomeArquivo), FileMode.Create))
            {
                foto.CopyTo(stream);
            }
        }
    }
}
