using Microsoft.EntityFrameworkCore;
using senai.spmedgroup.webApi.Context;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedgroup.webApi.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        readonly SpMedGroupContext ctx = new();
        public void AddDescricao(int idConsulta, string descricao)
        {
            Consultum consultaBuscada = ctx.Consulta.FirstOrDefault(c => c.IdConsulta == idConsulta);

            if (consultaBuscada != null)
            {
                consultaBuscada.Descricao = descricao;

                ctx.Consulta.Update(consultaBuscada);

                ctx.SaveChanges();
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
            return ctx.Consulta.Include("IdMedicoNavigation")
                .Include("IdPacienteNavigation")
                .Include("IdSituacaoNavigation")
                .Where(c => c.IdPaciente == idPaciente)
                .ToList();
        }

        public List<Consultum> ListarMinhasMedico(int idMedico)
        {
            return ctx.Consulta.Include("IdMedicoNavigation")
                .Include("IdPacienteNavigation")
                .Include("IdSituacaoNavigation")
                .Where(c => c.IdMedico == idMedico)
                .ToList();
        }

        public List<Consultum> ListarTodas()
        {
            return ctx.Consulta.ToList();
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
