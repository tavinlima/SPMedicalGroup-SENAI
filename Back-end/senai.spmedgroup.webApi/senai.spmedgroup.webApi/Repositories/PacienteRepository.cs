using Microsoft.EntityFrameworkCore;
using senai.spmedgroup.webApi.Context;
using senai.spmedgroup.webApi.Domains;
using senai.spmedgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace senai.spmedgroup.webApi.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        readonly SpMedGroupContext ctx = new();
        public void Atualizar(Paciente pacienteAtualizado)
        {
            Paciente pacienteBuscado = ctx.Pacientes.Find(pacienteAtualizado.IdPaciente);

            pacienteBuscado.DataNasc = pacienteAtualizado.DataNasc;
            pacienteBuscado.Cpf = pacienteAtualizado.Cpf;
            pacienteBuscado.Telefone = pacienteAtualizado.Telefone;
            pacienteBuscado.Rg = pacienteAtualizado.Rg;
            pacienteBuscado.Endereco = pacienteAtualizado.Endereco;

            ctx.Pacientes.Update(pacienteBuscado);

            ctx.SaveChanges();

        }

        public Paciente BuscarPorId(int idPaciente)
        {
            return ctx.Pacientes.FirstOrDefault(p => p.IdPaciente == idPaciente);
        }

        public void Cadastrar(Paciente novoPaciente)
        {
            ctx.Pacientes.Add(novoPaciente);

            ctx.SaveChanges();
        }

        public void Deletar(int idUsuario)
        {
            ctx.Pacientes.Remove(BuscarPorId(idUsuario));

            ctx.SaveChanges();
        }

        public List<Paciente> ListarTodos()
        {
            return ctx.Pacientes.Include(p => p.IdUsuarioNavigation).ToList();
        }
    }
}
