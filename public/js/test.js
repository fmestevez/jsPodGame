/**
 * @jsx React.DOM
 */


var Test = React.createClass({

    
    getDefaultProps: function() {
		return {
			listItemMap: [  {fName: "AAA", lName: "aaa", score: 0},
                            {fName: "BBB", lName: "bbb", score: 0}]
		};
	},
    
    
    render: function() {
    
        
        var items = this.props.listItemMap.map(function(data) {
			return (
				   <tr> 
                    <td>{data.fName}</td>
                    <td>{data.lName}</td>
                    <td>{data.score}</td>
                   </tr>                
				);
		});        
        
    return (
      <div>
        <table>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Points</th>
            </tr>        
        
            {items}        
         </table> 
      </div>
    );
  }    
    
});

React.renderComponent(
  <Test />,
  document.getElementById('example')
);