using System;
using System.Collections.Generic;

#nullable disable

namespace senai.spmedgroup.webApi.Domains
{
    public partial class Especialidade
    {
        public Especialidade()
        {
            Medicos = new HashSet<Medico>();
        }

        public short IdEspecialidade { get; set; }
        public string TituloEspecialidade { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
