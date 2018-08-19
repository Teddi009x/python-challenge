#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Aug  15 20:12:13 2018

@author: theodoresmiley
"""
#this will allow us to creat file patth across operating systems
import os 
import pandas as pd
import numpy as np

#Module for reading CSV files
import csv

#csvpath = os.path('/Users/theodoresmiley/Desktop/CWCL201807DATA2-Class-Repository-DATA/python-challenge/PyBank/')
#csvpath = os.path('resources/# Create a reference the CSV file desired
file = "Resources/budget_data.csv"

#Profit/Losses = int as pl
i = int
# Read the CSV into a Pandas DataFrame
budget_data = pd.read_csv(file)

# Print the first five rows of data to the screen
budget_data.head()

# List all the columns the table provides
budget_data.columns

# The sum method adds every entry in the series
months = budget_data["Profit/Losses"].count()
months
    
# The sum method adds every entry in the series
total = budget_data["Profit/Losses"].sum()
total

Avg = budget_data["Profit/Losses"].mean()
Avg


budget_data_max = budget_data["Profit/Losses"].max()
budget_data_max


