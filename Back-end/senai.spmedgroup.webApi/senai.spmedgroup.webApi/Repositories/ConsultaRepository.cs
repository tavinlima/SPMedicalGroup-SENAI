using Microsoft.EntityFrameworkCore;
using senai.spmedgroup.webApi.Context;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace senai.spmedgroup.webApi.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        readonly SpMedGroupContext ctx = new();
        public void AddDescricao(int idConsulta, string descricao, int id)
        {
            Consultum consultaBuscada = ctx.Consulta.FirstOrDefault(c => c.IdConsulta == idConsulta);

            Medico medicoBuscado = ctx.Medicos.FirstOrDefault(c => c.IdUsuario == id);

            if (medicoBuscado.IdMedico == consultaBuscada.IdMedico)
            {
                if (consultaBuscada != null)
                {
                    consultaBuscada.Descricao = descricao;

                    ctx.Consulta.Update(consultaBuscada);

                    ctx.SaveChanges();
                }
            }

        }

        public void Atualizar(Consultum consultaAtt)
        {
            Consultum consultaBuscada = ctx.Consulta.Find(consultaAtt.IdConsulta);

            consultaBuscada.Descricao = consultaAtt.Descricao;
            consultaBuscada.DataConsulta = consultaAtt.DataConsulta;
            consultaBuscada.IdMedico = consultaAtt.IdMedico;
            consultaBuscada.IdPaciente = consultaAtt.IdPaciente;
            consultaBuscada.IdSituacao = consultaAtt.IdSituacao;

            ctx.Consulta.Update(consultaBuscada);

            ctx.SaveChanges();
        }

        public Consultum BuscarPorId(int idConsulta)
        {
            return ctx.Consulta.FirstOrDefault(c => c.IdConsulta == idConsulta);
        }

        public void Cadastrar(Consultum novaConsulta)
        {
            ctx.Consulta.Add(novaConsulta);

            ctx.SaveChanges();
        }

        public void Deletar(int idConsulta)
        {
            ctx.Consulta.Remove(BuscarPorId(idConsulta));

            ctx.SaveChanges();
        }

        public List<Consultum> ListarMinhasPaciente(int idPaciente)
        {
            return ctx.Consulta
                .Include("IdMedicoNavigation")
                .Include(c => c.IdMedicoNavigation.IdUsuarioNavigation)
                .Include(c => c.IdMedicoNavigation.IdEspecialidadeNavigation)
                .Include("IdPacienteNavigation")
                .Include(c => c.IdPacienteNavigation.IdUsuarioNavigation)
                .Include("IdSituacaoNavigation")
                .Include(c => c.IdSituacaoNavigation)
                .Where(c => c.IdPacienteNavigation.IdUsuarioNavigation.IdUsuario == idPaciente).ToList();
        }

        public List<Consultum> ListarMinhasMedico(int idMedico)
        {
            Medico medicoBuscado = ctx.Medicos.FirstOrDefault(c => c.IdUsuario == idMedico);
            if (medicoBuscado.IdMedico != idMedico)
            {
                return null;
            }
            return ctx.Consulta
                .Include("IdMedicoNavigation")
                .Include(c => c.IdMedicoNavigation.IdUsuarioNavigation)
                .Include(c => c.IdMedicoNavigation.IdEspecialidadeNavigation)
                .Include("IdPacienteNavigation")
                .Include(c => c.IdPacienteNavigation.IdUsuarioNavigation)
                .Include("IdSituacaoNavigation")
                .Include(c => c.IdSituacaoNavigation)
                .Where(c => c.IdPacienteNavigation.IdUsuarioNavigation.IdUsuario == idMedico).ToList();
        }

        public List<Consultum> ListarTodas()
        {
            return ctx.Consulta
                .Include("IdSituacaoNavigation")
                .Include(c => c.IdSituacaoNavigation)
                .Include("IdMedicoNavigation")
                .Include(c => c.IdMedicoNavigation.IdUsuarioNavigation)
                .Include(c => c.IdMedicoNavigation.IdEspecialidadeNavigation)
                .Include("IdPacienteNavigation")
                .Include(c => c.IdPacienteNavigation.IdUsuarioNavigation)
                .ToList(); ;
        }

        public void MudarSituacao(int idConsulta, string status)
        {
            Consultum consultaBuscada = ctx.Consulta.FirstOrDefault(c => c.IdConsulta == idConsulta);

            switch (status)
            {
                case "1":
                    consultaBuscada.IdSituacao = 1;
                    break;
                case "2":
                    consultaBuscada.IdSituacao = 2;
                    break;
                case "3":
                    consultaBuscada.IdSituacao = 3;
                    break;
                default:
                    consultaBuscada.IdSituacao = consultaBuscada.IdSituacao;
                    break;
            }

            ctx.Consulta.Update(consultaBuscada);

            ctx.SaveChanges();
        }
    }
}
