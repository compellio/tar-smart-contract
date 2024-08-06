#! /usr/bin/env node
/*
 * Tokenized Asset Record (TAR) Smart Contracts
 * Copyright (C) 2024  Compellio S.A.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const fs = require("fs");
const canonicalize = require('canonicalize');

try {
    const input = fs.readFileSync(0).toString();
    const json = JSON.parse(input);
    const canonical = canonicalize(json);

    console.log(canonical);

} catch (e) {
    console.error("An error occurred")
    console.error(e)
}
