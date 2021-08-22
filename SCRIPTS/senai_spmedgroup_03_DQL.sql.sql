-- DQL

USE SPMEDGROUP_GUSTAVO;
GO

-- Listando dados de todas as tabelas criadas
SELECT * FROM tipoUsuario;
GO

SELECT * FROM usuario;
GO

SELECT * FROM situacao;
GO

SELECT * FROM paciente;
GO

SELECT * FROM especialidade;
GO

SELECT * FROM clinica;
GO

SELECT * FROM medico;
GO

SELECT * FROM consulta;
GO


-- Listar todos os dados relacionados a consulta:
SELECT U.nomeUsuario, UM.nomeUsuario, 
descricao,  
CONVERT(VARCHAR(20), dataConsulta, 13) [Data da Consulta], 
statusSituacao  
FROM consulta C
INNER JOIN medico M
ON C.idMedico = M.idMedico
JOIN paciente P
ON C.idPaciente = P.idPaciente
INNER JOIN usuario U
ON M.idMedico = U.idUsuario 
INNER JOIN usuario UM
ON P.idUsuario = UM.idUsuario
JOIN situacao S
ON C.idSituacao = S.idSituacao

-- Mostrar a quantidade de usu�rios ap�s realizar a importa��o do banco de dados:
SELECT COUNT(idUsuario)[Quantidade de usu�rios] FROM usuario;
GO

-- Converter a data de nascimento do usu�rio para o formato (mm-dd-yyyy) na exibi��o:
SELECT 
dataNasc, CONVERT(VARCHAR(20), 
dataNasc, 101) [Data de nascimento convertida],
telefone, 
CPF, 
RG, 
endereco 
FROM paciente

-- Criar uma fun��o para retornar a quantidade de m�dicos de uma determinada especialidade:
CREATE FUNCTION qntdMedEsp(@nomeEspecial VARCHAR(100))
RETURNS TABLE
AS
RETURN
(
SELECT @nomeEspecial Especializa��o, COUNT(idEspecialidade) [Quantidade de m�dicos] FROM especialidade
WHERE tituloEspecialidade LIKE '%'+ @nomeEspecial + '%'
)
GO

SELECT * FROM qntdMedEsp('Acumpuntura')

-- Criar uma fun��o para que retorne a idade do usu�rio a partir de uma determinada stored procedure:
CREATE PROCEDURE retIdadePaciente
@idPaciente INT
AS
BEGIN
SELECT nomeUsuario, DATEDIFF(YEAR, dataNasc, GETDATE()) Idade  FROM paciente
INNER JOIN usuario
ON paciente.idUsuario = usuario.idUsuario
WHERE idPaciente = @idPaciente
END
GO

EXEC retIdadePaciente 2