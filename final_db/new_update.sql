# Restart 

DROP DATABASE IF EXISTS fifa;
CREATE DATABASE fifa;

USE fifa; 
-- then Run new_schema_update_11_30.sql
-- Let's check DB
SELECT * FROM player;
SELECT * FROM team;
SELECT * FROM league;

-- To correct cracked team_name, Run Jupyther code Named "mysql_update" 
-- For the rest of them
UPDATE team SET team = 'Belgrano' WHERE teamId = 285;
UPDATE team SET team = 'Basaksehir' WHERE teamId = 132;
UPDATE team SET team = 'Saint-Étienne' WHERE teamId = 177;
UPDATE team SET team = 'Malmö FF' WHERE teamId = 196;
UPDATE team SET team = 'América-MG' WHERE teamId = 242;
UPDATE team SET team = 'BK Häcken' WHERE teamId = 305;
UPDATE team SET team = 'Leganés' WHERE teamId = 356;
UPDATE team SET team = 'FC Farul Constanța' WHERE teamId = 419;
UPDATE team SET team = 'Dinamo București' WHERE teamId = 540;
UPDATE team SET team = 'Tromsø' WHERE teamId = 612;

-- Make new players in player table --
# Pre-setting #
ALTER TABLE player
MODIFY COLUMN Overall INT DEFAULT 80,
MODIFY COLUMN Pace INT DEFAULT 80,
MODIFY COLUMN Shooting INT DEFAULT 80,
MODIFY COLUMN Passing INT DEFAULT 80,
MODIFY COLUMN Dribbling INT DEFAULT 80,
MODIFY COLUMN Defending INT DEFAULT 80,
MODIFY COLUMN Physicality INT DEFAULT 80,
MODIFY COLUMN Acceleration INT DEFAULT 80,
MODIFY COLUMN Sprint INT DEFAULT 80,
MODIFY COLUMN Positioning INT DEFAULT 80,
MODIFY COLUMN Finishing INT DEFAULT 80, 
MODIFY COLUMN Shot INT DEFAULT 80,
MODIFY COLUMN `Long` INT DEFAULT 80,
MODIFY COLUMN Volleys INT DEFAULT 80,
MODIFY COLUMN Penalties INT DEFAULT 80,
MODIFY COLUMN Vision INT DEFAULT 80,
MODIFY COLUMN Crossing INT DEFAULT 80,
MODIFY COLUMN Free INT DEFAULT 80,
MODIFY COLUMN Curve INT DEFAULT 80,
MODIFY COLUMN Agility INT DEFAULT 80,
MODIFY COLUMN Balance INT DEFAULT 80,
MODIFY COLUMN Reactions INT DEFAULT 80,
MODIFY COLUMN Ball INT DEFAULT 80,
MODIFY COLUMN Composure INT DEFAULT 80,
MODIFY COLUMN Interceptions INT DEFAULT 80,
MODIFY COLUMN Heading INT DEFAULT 80,
MODIFY COLUMN Def INT DEFAULT 80,
MODIFY COLUMN Standing INT DEFAULT 80,
MODIFY COLUMN Sliding INT DEFAULT 80,
MODIFY COLUMN Jumping INT DEFAULT 80,
MODIFY COLUMN Stamina INT DEFAULT 80,
MODIFY COLUMN Strength INT DEFAULT 80,
MODIFY COLUMN Aggression INT DEFAULT 80,
MODIFY COLUMN `Att work rate` VARCHAR(10) DEFAULT 'Medium',
MODIFY COLUMN `Def work rate` VARCHAR(10) DEFAULT 'Medium',
MODIFY COLUMN `Preferred foot` VARCHAR(10) DEFAULT 'Right',
MODIFY COLUMN `Weak foot` INT DEFAULT 3, 
MODIFY COLUMN `Skill moves` INT DEFAULT 3,
MODIFY COLUMN Gender VARCHAR(10) DEFAULT 'M',
MODIFY COLUMN GK INT DEFAULT 80;

# CREATE CUSTOM PLAEYR trigger #
DELIMITER //
CREATE TRIGGER after_player_insert
AFTER INSERT ON player
FOR EACH ROW
BEGIN
    -- Update team OVR
    UPDATE team SET OVR = (SELECT AVG(Overall) FROM player WHERE teamId = NEW.teamId);
    -- Update team ATT
    UPDATE team SET ATT = (
        SELECT AVG(Overall) 
        FROM player 
        WHERE (teamId = NEW.teamId) 
        AND ((`Position` = 'ST') OR (`Position` = 'CF') OR (`Position` = 'LW') OR (`Position` = 'RW'))
    ) WHERE teamId = NEW.teamId;
    
    UPDATE team SET MID = (
		SELECT AVG(Overall) 
		FROM player 
		WHERE (teamId = NEW.teamId) 
		AND ((`Position` = 'CAM') OR (`Position` = 'CM') OR (`Position` = 'CDM') OR (`Position` = 'LM') OR (`Position` = 'RM'))
		) WHERE teamId = NEW.teamId;
        
	UPDATE team SET DEF = (
		SELECT AVG(Overall) 
		FROM player 
		WHERE (teamId = NEW.teamId) 
		AND ((`Position` = 'GK') OR (`Position` = 'CB') OR (`Position` = 'LB') OR (`Position` = 'RB') OR (`Position` = 'LWB') OR (`Position` = 'RWB'))
		) WHERE teamId = NEW.teamId;
END;
//
DELIMITER ;

## Trigger TEST ## 
-- Before
SELECT * FROM team WHERE teamId = 1;

-- Insert a new player
INSERT INTO player (`﻿playerId`, `Name`, `Position`, `Age`, `Overall`, `Pace`, `Shooting`, `Passing`, `Dribbling`, `Defending`, `Physicality`, `countryId`, `teamId`)
VALUES (NULL, 'Test Player', 'ST', 23, 85, 88, 85, 84, 86, 82, 78, 1, 1);

-- Check the last 10 players
SELECT * FROM player ORDER BY  ﻿playerId DESC LIMIT 10;

-- After
SELECT * FROM team WHERE teamId = 1;