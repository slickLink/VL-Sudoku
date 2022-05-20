
/*
    getSubactive: function calculates the subactive squares given an active location
    args: ()
*/

const getSubactive = (activeIndex, game_type) => {
    //create 2D representaion of gameboard
    let game_board = new Array(game_type);
    for(let i = 0; i < game_type; i++) {
        game_board[i] = new Array(game_type);
    }

    // initialize 2D gameboard
    let value = 0;
    for(let i = 0; i < game_type; i++){
        for(let j = 0; j < game_type; j++) {
            game_board[i][j] = value++;
        }
    }
    //console.table(game_board);

    // convert active 1D index to active 2Dindex for 2D gameboard
    const one_2D_row = Math.floor(activeIndex / game_type);
    const one_2D_column = activeIndex % game_type;
    //console.log(`row: ${one_2D_row}\ncolumn: ${one_2D_column}`);
    
    let arr_sub = []
    let row = one_2D_row;
    let column = one_2D_column;
    //console.log(game_board[row][column])
    
    // travese left 
    for(let i = 0; i < game_type - 1; i++) {
        column--;
        try {
           // console.log(`row: ${row}\ncolumn: ${column}`);
            let subactive = game_board[row][column];
            arr_sub.push(subactive);
        } catch (error) {
            console.log('invalid index');
        }
    }

    row = one_2D_row;
    column = one_2D_column;
    // traverse right
    for(let i = 0; i < game_type - 1; i++) {
        column++;
        try {
           // console.log(`row: ${row}\ncolumn: ${column}`);
            let subactive = game_board[row][column];
            arr_sub.push(subactive);
        } catch (error) {
            console.log('invalid index');
        }
    }

    row = one_2D_row;
    column = one_2D_column;
    // traverse up
    for(let i = 0; i < game_type - 1; i++) {
        row--;
        try {
           // console.log(`row: ${row}\ncolumn: ${column}`);
            let subactive = game_board[row][column];
            arr_sub.push(subactive);
        } catch (error) {
            console.log('invalid index');
        }
    }

    row = one_2D_row;
    column = one_2D_column;
    // traverse down
    for(let i = 0; i < game_type - 1; i++) {
        row++;
        try {
           // console.log(`row: ${row}\ncolumn: ${column}`);
            let subactive = game_board[row][column];
            arr_sub.push(subactive);
        } catch (error) {
            console.log('invalid index');
        }
    }
    // fitler undefined out of subactive indexes
    return arr_sub.filter(num => num !== undefined);
    
}

/*
    generateGame: function generates an n x n balanced latinsquare
    values generated must be subtracted by 1 to be used as indexes
*/
const generateGame = (game_type) => {
    // create a 2K x 2K table
    let table = new Array(game_type);
    for(let i = 0; i < game_type; i++) {
        table[i] = new Array(game_type)
    }
    /* assign integers 1 - n in the first row from left to right
        only entering odd columns first, reverse then fill even columns
    */
    let row, column, even, odd;
    row = column = even = odd = 0;

    for(; column < game_type; column++) {
        let value = 0
        const index = column + 1;
        if (index  < 2 || index % 2 !== 0) {
            value = ++odd;
        } else {
            value = game_type - even;
            ++even;
        }
        
        table[row][column] = value;
    }
    
    /*
        from row 2 - individuals.length:
        fill each column starting with the prev row's column (top cell) downward
        enter the integer immediately after the one in the cell above.
        ex: if cell above is 1 then fill 2 
        new_cell = prev_top_cell++
    */
    for( row++; row < game_type; row++) {
        for(column = 0; column < game_type; column++) {
            table[row][column] = (table[row - 1][column] ) % game_type + 1;
        }
    }
    
    // return balancedLatinSquare table
    return table;
}

export  {getSubactive, generateGame};