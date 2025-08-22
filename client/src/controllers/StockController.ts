import { Request, Response } from "express";
import { StockService } from "../service/StockService";

export class StockController {
  private stockService: StockService;

  constructor(stockService: StockService) {
    this.stockService = stockService;
  }

  // Controller method to handle adding stock
  async addStock(req: Request, res: Response): Promise<void> {
    const { id, quantity, name } = req.body;

    if (!id || quantity === undefined) {
      res.status(400).json({ success: false, message: "ID and quantity are required" });
      return;
    }

    if (!name) {
        res.status(400).json({ success: false, message: "Name is required to create a new stock entry" });
        return;
    }

    try {
      const updatedStock = await this.stockService.addStock(id, quantity);
      res.status(200).json({ success: true, data: updatedStock });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Stock not found";
      res.status(500).json({ success: false, message: errorMessage });
    }
  }

  // Controller method to get all stock
  async getAllStocks(req: Request, res: Response): Promise<void> {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    try {
      const stocks = await this.stockService.getAllStocks(limit, offset);
      res.status(200).json({ success: true, data: stocks });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ success: false, message: errorMessage });
    }
  }

  // Controller method to handle adding multiple stock entries
  async addMultipleStocks(req: Request, res: Response): Promise<void> {
    const stocks = req.body;

    if (!Array.isArray(stocks) || stocks.length === 0) {
      res.status(400).json({ success: false, message: "An array of stock entries is required" });
      return;
    }

    try {
      const createdStocks = await this.stockService.addMultipleStocks(stocks);
      res.status(200).json({ success: true, data: createdStocks });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error adding multiple stock entries";
      res.status(500).json({ success: false, message: errorMessage });
    }
  }
}
