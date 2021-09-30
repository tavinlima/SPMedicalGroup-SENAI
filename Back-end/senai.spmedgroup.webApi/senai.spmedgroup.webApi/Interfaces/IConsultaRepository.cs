using senai.spmedgroup.webApi.Domains;
using System.Collections.Generic;

namespace senai.spmedgroup.webApi.Interfaces
{
    /// <summary>
    /// Repositório responsável pela ConsultaRepository
    /// </summary>
    interface IConsultaRepository
    {
        void Cadastrar(Consultum novaConsulta);
        List<Consultum> ListarTodas();
        Consultum BuscarPorId(int idConsulta);
        void Atualizar(Consultum consultaAtt);
        void Deletar(int idConsulta);
        List<Consultum> ListarMinhasPaciente(int idPaciente);
        List<Consultum> ListarMinhasMedico(int idMedico);
        void AddDescricao(int idConsulta, string descricao, int id);
        void MudarSituacao(int idConsulta, string status);
    }
}
