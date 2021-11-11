using Microsoft.EntityFrameworkCore;
using senai.spmedgroup.webApi.Context;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace senai.spmedgroup.webApi.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        readonly SpMedGroupContext ctx = new();
        public void Atualizar(Medico medicoAtualizado)
        {
            Medico medicoBuscado = ctx.Medicos.Find(medicoAtualizado.IdMedico);

            medicoBuscado.Crm = medicoAtualizado.Crm;
            medicoBuscado.IdEspecialidade = medicoAtualizado.IdEspecialidade;
            medicoBuscado.IdClinica = medicoAtualizado.IdClinica;

            ctx.Medicos.Update(medicoBuscado);

            ctx.SaveChanges();
        }

        public Medico BuscarPorId(int idMedico)
        {
            return ctx.Medicos.FirstOrDefault(m => m.IdMedico == idMedico);
        }

        public void Cadastrar(Medico novoMedico)
        {
            ctx.Medicos.Add(novoMedico);

            ctx.SaveChanges();
        }

        public void Deletar(int idMedico)
        {
            ctx.Medicos.Remove(BuscarPorId(idMedico));

            ctx.SaveChanges();
        }

        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.Include(u => u.IdEspecialidadeNavigation).Include(u => u.IdUsuarioNavigation).ToList();
        }
    }
}
