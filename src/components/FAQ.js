import '../components/faq.css';
/* FAQ section of the application */
const FAQ = () => {

    return (
        <section className='FAQ-container'>
            <h1 className='title'>VL SUDOKU</h1>
            <article className='faq-article'>
                <h3 className='subtitle'>What is Variable Latin Sudoku?</h3>
                <p className='paragraph'>Variable Latin Sudoku is a Latin square based game, the game allows you to choose what type of Latin square you would prefer to enjoy.</p>

                <h3 className='subtitle'>What is a Latin Square?</h3>
                <p className='paragraph'>A Latin square is an n x n array filled with n different symbols, each occurring exactly once in each row and exactly once in each column.</p>

                <h3 className='subtitle'>How to play?</h3>
                <p className='paragraph'>Like Sudoku, each number can only appear once in a row and column.</p>
            </article>
        </section>
    )
}

export default FAQ;