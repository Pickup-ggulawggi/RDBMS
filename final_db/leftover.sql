-- SAVE DATABASE
SHOW VARIABLES LIKE 'secure_file_priv';

SELECT * FROM player;
SELECT ﻿playerId FROM player ORDER BY ﻿playerId;


SELECT ﻿playerId FROM player ORDER BY ﻿playerId
INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.1/Uploads/check.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
ESCAPED BY '\\'
LINES TERMINATED BY '\n';

SET autocommit = 0;
-- CASE 1) FW, teamId = 4
-- 공격수로 선수가 등록되었기 때문에, Team의 ATT, OVR에도 Update가 필요함
SELECT * FROM team WHERE teamId = 4;

START TRANSACTION;
INSERT INTO player (`﻿playerId`, `Name`, `Position`, `Age`, `Overall`, `Pace`, `Shooting`, `Passing`, `Dribbling`, `Defending`, `Physicality`, `countryId`, `teamId`)
VALUES (NULL, 'Minkyu', 'ST', 25, 90, 95, 93, 92, 91, 90, 90, 0, 4);
-- OVR & ATT 갱신
UPDATE team SET OVR = (SELECT AVG(Overall) FROM player WHERE teamId = 4) WHERE teamId = 4; 
UPDATE team SET ATT = (
SELECT AVG(Overall) 
FROM player 
WHERE (teamId = 4) 
AND ((`Position` = 'ST') OR (`Position` = 'CF') OR (`Position` = 'LW') OR (`Position` = 'RW'))
);

SELECT * FROM player ORDER BY ﻿playerId DESC LIMIT 10; -- doulbe check
SELECT * FROM team WHERE teamId = 4;

COMMIT;
-- ROLLBACK

-- CASE 2) Mid, teamId = 4 w / Mid
-- 공격수로 선수가 등록되었기 때문에, Team의 ATT, OVR에도 Update가 필요함
INSERT INTO player (`﻿playerId`, `Name`, `Position`, `Age`, `Overall`, `Pace`, `Shooting`, `Passing`, `Dribbling`, `Defending`, `Physicality`, `countryId`, `teamId`)
VALUES (NULL, 'Minkyu1', 'CM', 25, 90, 95, 93, 92, 91, 90, 90, 0, 4);

SELECT * FROM player ORDER BY ﻿playerId DESC LIMIT 10; -- doulbe check
-- OVR 갱신 & MID 갱신
UPDATE team SET OVR = (SELECT AVG(Overall) FROM player WHERE teamId = 4) WHERE teamId = 4;
UPDATE team SET MID = (
SELECT AVG(Overall) 
FROM player 
WHERE (teamId = 4) 
AND ((`Position` = 'CAM') OR (`Position` = 'CM') OR (`Position` = 'CDM') OR (`Position` = 'LM') OR (`Position` = 'RM'))
);
SELECT * FROM team WHERE teamId = 4;

-- CASE 3) DEF, teamId = 4 w / DEF
-- 공격수로 선수가 등록되었기 때문에, Team의 ATT, OVR에도 Update가 필요함
INSERT INTO player (`﻿playerId`, `Name`, `Position`, `Age`, `Overall`, `Pace`, `Shooting`, `Passing`, `Dribbling`, `Defending`, `Physicality`, `countryId`, `teamId`)
VALUES (NULL, 'Minkyu2', 'CB', 25, 90, 95, 93, 92, 91, 90, 90, 0, 4);
SELECT * FROM player ORDER BY ﻿playerId DESC LIMIT 10; -- doulbe check

DELETE FROM player WHERE ﻿playerId = 15846 OR ﻿playerId = 15845;

-- OVR & DEF 갱신
UPDATE team SET OVR = (SELECT AVG(Overall) FROM player WHERE teamId = 4) WHERE teamId = 4;
UPDATE team SET DEF = (
SELECT AVG(Overall) 
FROM player 
WHERE (teamId = 4) 
AND ((`Position` = 'GK') OR (`Position` = 'CB') OR (`Position` = 'LB') OR (`Position` = 'RB') OR (`Position` = 'LWB') OR (`Position` = 'RWB'))
);
SELECT * FROM team WHERE teamId = 4;

