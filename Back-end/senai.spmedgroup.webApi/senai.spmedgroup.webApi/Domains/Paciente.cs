using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.spmedgroup.webApi.Domains
{
    public partial class Paciente
    {
        public Paciente()
        {
            Consulta = new HashSet<Consultum>();
        }

        public int IdPaciente { get; set; }
        public int? IdUsuario { get; set; }
        public DateTime DataNasc { get; set; }
        public string Telefone { get; set; }

        [Required(ErrorMessage = "Por favor, insira o CPF do paciente")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "Por favor, insira o RG do paciente")]
        public string Rg { get; set; }
        public string Endereco { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
