-- DML

USE SPMEDGROUP_GUSTAVO;
GO

-- Inserindo dados nas tabelas de:
-- TipoUsuario
INSERT INTO tipoUsuario (tituloTipoUsuario)
VALUES ('Administrador'), ('Médico'), ('Paciente');
GO

-- Usuario
INSERT INTO usuario (idTipoUsuario, nomeUsuario, email, senha)
VALUES (2, 'Ricardo Lemos', 'ricardo.lemos@spmedicalgroup.com.br', '11111111'),
	   (2, 'Roberto Possarle', 'roberto.possarle@spmedicalgroup.com.br', '22222222'),
	   (2, 'Helena Strada', 'helena.souza@spmedicalgroup.com.br', '33333333'),
	   (3, 'Ligia', 'ligia@gmail.com', '44444444'),
	   (3, 'Alexandre', 'alexandre@gmail.com', '55555555'),
	   (3, 'Fernando', 'fernando@gmail.com', '66666666'),
	   (3, 'Henrique', 'henrique@gmail.com', '77777777'),
	   (3, 'João', 'joao@hotmail.com', '88888888'),
	   (3, 'Bruno', 'bruno@gmail.com', '99999999'),
	   (3, 'Mariana', 'mariana@outlook.com', '10101010');
GO

-- Situação
INSERT INTO situacao (statusSituacao)
VALUES ('Agendada'), ('Realizada'), ('Cancelada');
GO

--Paciente
INSERT INTO paciente (idUsuario, dataNasc, telefone, CPF, RG, endereco)
VALUES (4, '1983-10-13', '113456-7654', '94839859000',	'43522543-5', 'Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000'),
	   (5,	'2001-7-23', '1198765-6543',	'73556944057',	'32654345-7',	'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200'),
	   (6,	'1978-10-10', '1197208-4453',	'16839338002',	'54636525-3',	'Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200'),
	   (7,	'1985-10-13', '113456-6543',	'14332654765',	'54366362-5',	'R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030'),
	   (8,	'1975-8-27', '117656-6377',	'91305348010',	'53254444-1',	'R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380'),
	   (9,	'1972-3-21', '1195436-8769',	'79799299004',	'54566266-7',	'Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001');
GO

INSERT INTO paciente (idUsuario, dataNasc, telefone, CPF, RG, endereco)
VALUES (10,	'2018-3-5', NULL, '13771913039', '54566266-8', 'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140');
GO

-- Atualizou os registros que não possuem data de nascimento conforme especificado pelo cliente
/*
UPDATE paciente 
SET dataNasc = '2018-3-5'
WHERE idPaciente = 7
*/

-- Especialidade
INSERT INTO especialidade (tituloEspecialidade)
VALUES ('Acupuntura'),
       ('Anestesiologia'),
	   ('Cardiologia'),
	   ('Cirurgia Cardiovascular'),
	   ('Cirurgia da Mão'),
	   ('Cirurgia do Aparelho Digestivo'),
	   ('Cirurgia Geral'),
	   ('Cirurgia Pediátrica'),
	   ('Cirurgia Plástica'),
	   ('Cirurgia Torácica'),
	   ('Cirurgia Vascular'),
	   ('Dermatologia'),
	   ('Radioterapia'),
	   ('Urologia'),
	   ('Pediatria'),
	   ('Psiquiatria');
GO

-- Clinica
INSERT INTO clinica (enderecoClinica, horaAbre, horaFecha, CNPJ, nomeFantasia, RazaoSocial)
VALUES ('Av. Barão Limeira, 532, São Paulo, SP', '07:00:00', '19:00:00', '86.400.902/0001-30',	'Clinica Possarle',	'SP Medical Group');
GO

-- Medico
INSERT INTO medico (idUsuario, idEspecialidade, idClinica, CRM)
VALUES (1, 2, 1, '54356-SP'),
       (2, 16, 1, '53452-SP'),
	   (3, 15, 1, '65463-SP');
GO

-- Consulta
INSERT INTO consulta (idPaciente, idMedico, descricao, dataConsulta, idSituacao)
VALUES (7,	3, 'Check-Up Anual', '20/01/2020 15:00:00', 2),
       (2,	2, 'Consulta Semanal', '20/01/2020 10:00:00', 3),
	   (3,	2, 'Consulta Mensal', '07/02/2020 11:00:00', 2),
	   (2,	2, 'Consulta Semanal', '06/02/2018 10:00:00', 2),
	   (4,	1, 'Cirurgia do apêndice', '07/02/2019 11:00:00', 3),
	   (7,	3, 'Dor de barriga', '08/03/2020 15:00:00', 1),
	   (4,	1, 'Parto normal', '09/03/2020 11:00:00', 1);
GO
