-- MySQL Script generated by MySQL Workbench
-- Sat Mar 27 14:06:23 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema locadoradb_test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema locadoradb_test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `locadoradb_test` DEFAULT CHARACTER SET utf8 ;
USE `locadoradb_test` ;

-- -----------------------------------------------------
-- Table `locadoradb_test`.`Customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `locadoradb_test`.`Customers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `locadoradb_test`.`Movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `locadoradb_test`.`Movies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `director` VARCHAR(100) NOT NULL,
  `amount` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `locadoradb_test`.`Rents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `locadoradb_test`.`Rents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rentalDate` DATETIME NOT NULL,
  `returnDate` DATETIME NULL,
  `expectedReturnDate` DATETIME NOT NULL,
  `idCustomer` INT NOT NULL,
  `idMovie` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Rents_Customers_idx` (`idCustomer` ASC) VISIBLE,
  INDEX `fk_Rents_Movies1_idx` (`idMovie` ASC) VISIBLE,
  CONSTRAINT `fk_Rents_Customers`
    FOREIGN KEY (`idCustomer`)
    REFERENCES `locadoradb_test`.`Customers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Rents_Movies1`
    FOREIGN KEY (`idMovie`)
    REFERENCES `locadoradb_test`.`Movies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
