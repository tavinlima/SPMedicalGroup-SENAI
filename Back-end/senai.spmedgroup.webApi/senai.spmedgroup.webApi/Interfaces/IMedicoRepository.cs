using senai.spmedgroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedgroup.webApi.Interfaces
{
    /// <summary>
    /// Interface responsável pelo MedicoRepository
    /// </summary>
    interface IMedicoRepository
    {
        void Cadastrar(Medico novoMedico);
        List<Medico> ListarTodos();
        Medico BuscarPorId(int idMedico);
        void Atualizar(Medico medicoAtualizado);
        void Deletar(int idMedico);
    }
}
