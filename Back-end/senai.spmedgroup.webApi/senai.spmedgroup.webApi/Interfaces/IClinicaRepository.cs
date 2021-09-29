using senai.spmedgroup.webApi.Domains;
using System.Collections.Generic;

namespace senai.spmedgroup.webApi.Interfaces
{
    /// <summary>
    /// Interface responsável pelo ClinicaRepository
    /// </summary>
    interface IClinicaRepository
    {
        void Cadastrar(Clinica novaClinica);
        List<Clinica> ListarTodas();
        Clinica BuscarPorId(int idClinica);
        void Atualizar(Clinica clinicaAtualizada);
        void Deletar(int idClinica);
    }
}
