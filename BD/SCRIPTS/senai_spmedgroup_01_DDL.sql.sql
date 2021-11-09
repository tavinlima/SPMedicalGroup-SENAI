-- DDL

CREATE DATABASE SPMEDGROUP_GUSTAVO;
GO

USE SPMEDGROUP_GUSTAVO;
GO

-- Criação das tabelas de:
-- tipoUsuario
CREATE TABLE tipoUsuario (
	idTipoUsuario TINYINT PRIMARY KEY IDENTITY(1,1),
	tituloTipoUsuario VARCHAR(50) UNIQUE NOT NULL
);
GO

-- Usuario
CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY IDENTITY(1,1),
	idTipoUsuario TINYINT FOREIGN KEY REFERENCES tipoUsuario(idTipoUsuario),
	nomeUsuario VARCHAR(100) NOT NULL,
	email VARCHAR(256) UNIQUE NOT NULL,
	senha VARCHAR(100) NOT NULL CHECK( len(senha) >= 8)
);
GO

-- Situacao
CREATE TABLE situacao (
	idSituacao TINYINT PRIMARY KEY IDENTITY(1,1),
	statusSituacao VARCHAR(25) UNIQUE NOT NULL
);
GO

-- Paciente
CREATE TABLE paciente (
	idPaciente INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
	dataNasc DATE NOT NULL,
	telefone CHAR(12) UNIQUE,
	CPF CHAR(11) UNIQUE NOT NULL,
	RG CHAR(14) UNIQUE NOT NULL,
	endereco VARCHAR(150) NOT NULL
);
GO

-- Especialidade
CREATE TABLE especialidade (
	idEspecialidade SMALLINT PRIMARY KEY IDENTITY(1,1),
	tituloEspecialidade VARCHAR(100) UNIQUE NOT NULL
);
GO

-- Clinica
CREATE TABLE clinica(
	idClinica TINYINT PRIMARY KEY IDENTITY(1,1),
	enderecoClinica VARCHAR(150) UNIQUE NOT NULL,
	horaAbre TIME NOT NULL,
	horaFecha TIME NOT NULL,
	CNPJ CHAR(18) UNIQUE NOT NULL,
	nomeFantasia VARCHAR(50) NOT NULL,
	RazaoSocial VARCHAR(50) UNIQUE NOT NULL
);
GO

-- Medico
CREATE TABLE medico (
	idMedico INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
	idClinica TINYINT FOREIGN KEY REFERENCES clinica(idClinica),
	idEspecialidade SMALLINT FOREIGN KEY REFERENCES especialidade(idEspecialidade),
	CRM VARCHAR(10) UNIQUE NOT NULL
);
GO

-- Consulta
CREATE TABLE consulta(
	idConsulta INT PRIMARY KEY IDENTITY(1,1),
	idPaciente INT FOREIGN KEY REFERENCES paciente(idPaciente),
	idMedico INT FOREIGN KEY REFERENCES medico(idMedico),
	descricao VARCHAR(160) NOT NULL,
	dataConsulta SMALLDATETIME NOT NULL,
	idSituacao TINYINT FOREIGN KEY REFERENCES situacao(idSituacao) DEFAULT(1)
);
GO