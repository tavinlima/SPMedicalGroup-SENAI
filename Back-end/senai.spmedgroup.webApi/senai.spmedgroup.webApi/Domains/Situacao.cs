using System;
using System.Collections.Generic;

#nullable disable

namespace senai.spmedgroup.webApi.Domains
{
    public partial class Situacao
    {
        public Situacao()
        {
            Consulta = new HashSet<Consultum>();
        }

        public byte IdSituacao { get; set; }
        public string StatusSituacao { get; set; }

        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
