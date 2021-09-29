using senai.spmedgroup.webApi.Context;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace senai.spmedgroup.webApi.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        readonly SpMedGroupContext ctx = new();
        public void Atualizar(TipoUsuario tipoAtualizado)
        {
            TipoUsuario tipoBuscado = ctx.TipoUsuarios.Find(tipoAtualizado.IdTipoUsuario);

            tipoBuscado.TituloTipoUsuario = tipoAtualizado.TituloTipoUsuario;

            ctx.TipoUsuarios.Update(tipoBuscado);

            ctx.SaveChanges();
        }

        public TipoUsuario BuscarPorId(int idTipo)
        {
            return ctx.TipoUsuarios.FirstOrDefault(t => t.IdTipoUsuario == idTipo);
        }

        public void Cadastrar(TipoUsuario novoTipo)
        {
            ctx.TipoUsuarios.Add(novoTipo);

            ctx.SaveChanges();
        }

        public void Deletar(int idTipo)
        {
            ctx.TipoUsuarios.Remove(BuscarPorId(idTipo));

            ctx.SaveChanges();
        }

        public List<TipoUsuario> ListarTodos()
        {
            return ctx.TipoUsuarios.ToList();
        }
    }
}
