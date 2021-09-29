using Microsoft.EntityFrameworkCore;
using senai.spmedgroup.webApi.Context;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace senai.spmedgroup.webApi.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        readonly SpMedGroupContext ctx = new();
        public void Atualizar(Clinica clinicaAtualizada)
        {
            Clinica clinicaBuscada = ctx.Clinicas.Find(clinicaAtualizada.IdClinica);

            clinicaBuscada.NomeFantasia = clinicaAtualizada.NomeFantasia;
            clinicaBuscada.RazaoSocial = clinicaAtualizada.RazaoSocial;
            clinicaBuscada.Cnpj = clinicaAtualizada.Cnpj;
            clinicaBuscada.HoraAbre = clinicaAtualizada.HoraAbre;
            clinicaBuscada.HoraFecha = clinicaAtualizada.HoraFecha;
            clinicaBuscada.EnderecoClinica = clinicaAtualizada.EnderecoClinica;

            ctx.Clinicas.Update(clinicaBuscada);

            ctx.SaveChanges();
        }

        public Clinica BuscarPorId(int idClinica)
        {
            return ctx.Clinicas.FirstOrDefault(c => c.IdClinica == idClinica);
        }

        public void Cadastrar(Clinica novaClinica)
        {
            ctx.Clinicas.Add(novaClinica);

            ctx.SaveChanges();
        }

        public void Deletar(int idClinica)
        {
            ctx.Clinicas.Remove(BuscarPorId(idClinica));

            ctx.SaveChanges();
        }

        public List<Clinica> ListarTodas()
        {
            return ctx.Clinicas.ToList();
        }
    }
}
