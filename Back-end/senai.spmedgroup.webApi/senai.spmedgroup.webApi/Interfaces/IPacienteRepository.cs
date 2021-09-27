using senai.spmedgroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedgroup.webApi.Interfaces
{
    /// <summary>
    /// Interface responsável pelo PacienteRepository
    /// </summary>
    interface IPacienteRepository
    {
        void Cadastrar(Paciente novoPaciente);
        List<Paciente> ListarTodos();
        Paciente BuscarPorId(int idPaciente);
        void Atualizar(Paciente pacienteAtualizado);
        void Deletar(int idPaciente);

    }
}
