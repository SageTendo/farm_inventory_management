import express from "express";
import { StockController } from "../controllers/StockController";
import { StockService } from "../service/StockService";
import { StockRepository } from "../database/repository/StockRepository";
import { db } from "../database/db";

const router = express.Router();

// Initialize dependencies
const stockRepository = new StockRepository(db);
const stockService = new StockService(stockRepository);
const stockController = new StockController(stockService);

// Route to add stock
router.post("/add-stock", (req, res) => stockController.addStock(req, res));

// Route to get all stocks
router.get("/all-stocks", (req, res) => stockController.getAllStocks(req, res));

// Route to add multiple stock entries
router.post("/add-multiple-stocks", (req, res) => stockController.addMultipleStocks(req, res));

export default router;
