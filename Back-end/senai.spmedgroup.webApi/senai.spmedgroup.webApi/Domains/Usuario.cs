using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.spmedgroup.webApi.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Medicos = new HashSet<Medico>();
            Pacientes = new HashSet<Paciente>();
        }

        public int IdUsuario { get; set; }
        public byte? IdTipoUsuario { get; set; }

        [Required(ErrorMessage = "Por favor, informe o nome do Usuario")]
        public string NomeUsuario { get; set; }

        [Required(ErrorMessage = "Por favor, informe o e-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Por favor, informe a senha")]
        [StringLength(256, MinimumLength = 8, ErrorMessage = "O campo senha precisa ter no mínimo 8 caracteres")]
        public string Senha { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<Medico> Medicos { get; set; }
        public virtual ICollection<Paciente> Pacientes { get; set; }
    }
}
