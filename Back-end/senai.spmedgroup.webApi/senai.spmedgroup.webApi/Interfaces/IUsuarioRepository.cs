using senai.spmedgroup.webApi.Domains;
using System.Collections.Generic;

namespace senai.spmedgroup.webApi.Interfaces
{
    /// <summary>
    /// Interface responsável pelo UsuarioRepository
    /// </summary>
    interface IUsuarioRepository
    {
        Usuario Login(string email, string senha);
        void Cadastrar(Usuario novoUsuario);
        List<Usuario> ListarTodos();
        Usuario BuscarPorId(int idUsuario);
        void Atualizar(Usuario usuarioAtualizado);
        void Deletar(int idUsuario);
    }
}
