using senai.spmedgroup.webApi.Domains;
using System.Collections.Generic;

namespace senai.spmedgroup.webApi.Interfaces
{
    /// <summary>
    /// Interface responsável pelo TipoUsuarioRepository
    /// </summary>
    interface ITipoUsuarioRepository
    {
        void Cadastrar(TipoUsuario novoTipo);
        List<TipoUsuario> ListarTodos();
        TipoUsuario BuscarPorId(int idTipo);
        void Atualizar(TipoUsuario tipoAtualizado);
        void Deletar(int idTipo);
    }
}
