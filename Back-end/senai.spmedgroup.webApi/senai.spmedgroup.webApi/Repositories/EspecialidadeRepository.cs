using senai.spmedgroup.webApi.Context;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace senai.spmedgroup.webApi.Repositories
{
    public class EspecialidadeRepository : IEspecialidadeRepository
    {
        readonly SpMedGroupContext ctx = new();
        public void Atualizar(Especialidade especialidadeAtt)
        {
            Especialidade especialidadeBuscada = ctx.Especialidades.Find(especialidadeAtt.IdEspecialidade);

            especialidadeBuscada.TituloEspecialidade = especialidadeAtt.TituloEspecialidade;

            ctx.Especialidades.Update(especialidadeBuscada);

            ctx.SaveChanges();
        }

        public Especialidade BuscarPorId(int idEspecialidade)
        {
            return ctx.Especialidades.FirstOrDefault(e => e.IdEspecialidade == idEspecialidade);
        }

        public void Cadastrar(Especialidade novaEspecialidade)
        {
            ctx.Especialidades.Add(novaEspecialidade);

            ctx.SaveChanges();
        }

        public void Deletar(int idEspecialidade)
        {
            ctx.Especialidades.Remove(BuscarPorId(idEspecialidade));

            ctx.SaveChanges();
        }

        public List<Especialidade> ListarTodas()
        {
            return ctx.Especialidades.ToList();
        }
    }
}
