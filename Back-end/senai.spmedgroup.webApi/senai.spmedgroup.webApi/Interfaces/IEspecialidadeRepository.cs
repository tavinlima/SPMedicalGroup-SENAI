using senai.spmedgroup.webApi.Domains;
using System.Collections.Generic;

namespace senai.spmedgroup.webApi.Interfaces
{
    /// <summary>
    /// Interface responsável pelo Especialidade Repository
    /// </summary>
    interface IEspecialidadeRepository
    {
        void Cadastrar(Especialidade novaEspecialidade);
        List<Especialidade> ListarTodas();
        Especialidade BuscarPorId(int idEspecialidade);
        void Atualizar(Especialidade especialidadeAtt);
        void Deletar(int idEspecialidade);
    }
}
